<?php
/**
 * Jetpack CRM Automation Update_Contact_Status action.
 *
 * @package automattic/jetpack-crm
 */

namespace Automattic\Jetpack\CRM\Automation\Actions;

use Automattic\Jetpack\CRM\Automation\Base_Action;
use Automattic\Jetpack\CRM\Automation\Data_Types\Data_Type_Base;
use Automattic\Jetpack\CRM\Automation\Data_Types\Data_Type_Contact;

/**
 * Adds the Update_Contact_Status class.
 */
class Update_Contact_Status extends Base_Action {

	/**
	 * Get the slug name of the step
	 *
	 * @return string
	 */
	public static function get_slug(): string {
		return 'jpcrm/update_contact_status';
	}

	/**
	 * Get the title of the step
	 *
	 * @return string
	 */
	public static function get_title(): ?string {
		return 'Update Contact Status Action';
	}

	/**
	 * Get the description of the step
	 *
	 * @return string
	 */
	public static function get_description(): ?string {
		return 'Action to update the contact status';
	}

	/**
	 * Get the data type
	 *
	 * @return string
	 */
	public static function get_data_type(): string {
		return Data_Type_Contact::get_slug();
	}

	/**
	 * Get the category of the step
	 *
	 * @return string
	 */
	public static function get_category(): ?string {
		return 'actions';
	}

	/**
	 * Get the allowed triggers
	 *
	 * @return array
	 */
	public static function get_allowed_triggers(): ?array {
		return array();
	}

	/**
	 * Update the DAL with the new contact status.
	 *
	 * @param Data_Type_Base $data An instance of the contact data type.
	 */
	public function execute( Data_Type_Base $data ) {
		global $zbs;

		$contact_data                   = $data->get_entity();
		$contact_data['data']['status'] = $this->attributes['new_status'];
		$zbs->DAL->contacts->addUpdateContact( $contact_data ); // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
	}

}
