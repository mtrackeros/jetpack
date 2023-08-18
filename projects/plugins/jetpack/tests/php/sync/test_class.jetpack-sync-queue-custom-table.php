<?php

use Automattic\Jetpack\Sync\Queue;
use Automattic\Jetpack\Sync\Queue\Queue_Storage_Table;
use Automattic\Jetpack\Sync\Settings;

require_once __DIR__ . '/class-wp-test-jetpack-sync-queue-base-tests.php';

/**
 * @group jetpack-sync
 * @group jetpack-sync-queue
 * @group jetpack-sync-queue-custom-table
 */
class WP_Test_Jetpack_Sync_Queue_Dedicated_Table extends WP_Test_Jetpack_Sync_Queue_Base_Tests {

	/**
	 * @var Queue
	 */
	public $queue;

	public $test_queue_name = 'my_queue_dedicated_table';

	// Ignoring as Dev requirement is >= PHP7
	// phpcs:ignore PHPCompatibility.FunctionDeclarations.NewReturnTypeDeclarations.voidFound
	public function set_up() {
		parent::set_up();

		// Reset the setting to be always set to 1.
		Settings::update_settings(
			array(
				'custom_queue_table_enabled' => 0,
			)
		);

		Settings::update_settings(
			array(
				'custom_queue_table_enabled' => 1,
			)
		);

		$this->queue = new Queue( $this->test_queue_name );

		// Reset to initial state. Sometimes buffers were not properly closed.
		$this->queue->reset();
	}

	// Ignoring as Dev requirement is > PHP7
	// phpcs:ignore PHPCompatibility.FunctionDeclarations.NewReturnTypeDeclarations.voidFound
	public function tear_down() {
		parent::tear_down(); // TODO: Change the autogenerated stub

		// Disable the custom table setting
		Settings::update_settings(
			array(
				'custom_queue_table_enabled' => 0,
			)
		);
	}

	public function test_dedicated_table_disabled_should_instantiate_options_backend() {
		// Assumption is the `setUp` method will enable the Custom table.
		$this->assertTrue( Settings::is_custom_queue_table_enabled() );

		// Make sure the Queue will get instantiated and fall back to the options table.
		$temporary_queue = new Queue( 'some_test_id' );
		$this->assertInstanceOf( Queue\Queue_Storage_Table::class, $temporary_queue->queue_storage );

		unset( $temporary_queue );

		Settings::update_settings(
			array(
				'custom_queue_table_enabled' => 0,
			)
		);

		// Make sure the Queue will get instantiated and fall back to the options table.
		$temporary_queue = new Queue( 'some_test_id' );
		$this->assertInstanceOf( Queue\Queue_Storage_Options::class, $temporary_queue->queue_storage );
	}

	public function test_migration_to_dedicated_table() {
		parent::setUp();

		$test_queue_id = 'mytestqueue';

		// Revert to Options table.
		Settings::update_settings(
			array(
				'custom_queue_table_enabled' => 0,
			)
		);

		$test_queue                = new Queue( $test_queue_id );
		$test_queue->queue_storage = new Queue\Queue_Storage_Options( $test_queue_id );

		// Empty out the queue
		$test_queue->queue_storage->clear_queue();

		// Add more items, so we can also test the pagination.
		for ( $i = 0; $i < 300; $i++ ) {
			$test_queue->add( 'baz' . $i );
		}

		$items_in_table_before_migration = $test_queue->get_all();

		/**
		 * Reflection to enable manual table creation.
		 */
		$reflection_class    = new ReflectionClass( Queue_Storage_Table::class );
		$create_table_method = $reflection_class->getMethod( 'create_table' );
		$create_table_method->setAccessible( true );

		// Reset the table
		$table_storage = new Queue_Storage_Table( $test_queue_id );
		$table_storage->drop_table();
		$create_table_method->invoke( $table_storage );

		Queue_Storage_Table::migrate_from_options_table_to_custom_table();

		$this->assertEquals( 300, $table_storage->get_item_count() );

		$items_in_table = $table_storage->get_items_ids_with_size( 500 );

		$keys_before_migration = array_column( $items_in_table_before_migration, 'id' );
		$keys_after_migration  = array_column( $items_in_table, 'id' );

		$this->assertEquals( $keys_before_migration, $keys_after_migration );

		// check the options queue is empty
		$options_storage = new Queue\Queue_Storage_Options( $test_queue_id );
		$options_counts  = $options_storage->get_item_count();

		$this->assertEquals( $options_counts, 0 );
	}

	public function test_migration_to_options_table() {
		parent::setUp();

		$test_queue_id = 'mytestqueue';

		// Assuming the test table is set on the setUp.

		$test_queue                = new Queue( $test_queue_id );
		$test_queue->queue_storage = new Queue\Queue_Storage_Table( $test_queue_id );

		// Empty out the queue
		$test_queue->queue_storage->clear_queue();

		// Add more items, so we can also test the pagination.
		for ( $i = 0; $i < 300; $i++ ) {
			$test_queue->add( 'foo' . $i );
		}

		$items_in_table_before_migration = $test_queue->get_all();

		// Reset the table
		$options_storage = new Queue\Queue_Storage_Options( $test_queue_id );
		$options_storage->clear_queue();

		Queue_Storage_Table::migrate_from_custom_table_to_options_table();

		$this->assertEquals( 300, $options_storage->get_item_count() );

		$items_in_table = $options_storage->get_items_ids_with_size( 500 );

		$keys_before_migration = array_column( $items_in_table_before_migration, 'id' );
		$keys_after_migration  = array_column( $items_in_table, 'id' );

		$this->assertEquals( $keys_before_migration, $keys_after_migration );

		// check the options queue is empty
		$custom_table_storage = new Queue\Queue_Storage_Table( $test_queue_id );
		$options_counts       = $custom_table_storage->get_item_count();

		$this->assertEquals( 0, $options_counts );
	}
}
