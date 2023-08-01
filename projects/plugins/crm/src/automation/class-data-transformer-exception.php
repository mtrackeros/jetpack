<?php
/**
 * Jetpack CRM Automation data transformer exception.
 *
 * @package Automattic\Jetpack\CRM
 */

namespace Automattic\Jetpack\CRM\Automation;

/**
 * Adds a Data_Transformer specific exception.
 *
 * @since $$next-version$$
 *
 * @package Automattic\Jetpack\CRM\Automation
 */
class Data_Transformer_Exception extends \Exception {
	const CLASS_NOT_FOUND            = 10;
	const DO_NOT_EXTEND_BASE         = 11;
	const SLUG_EXISTS                = 12;
	const MISSING_LINK               = 20;
	const TRANSFORM_IS_NOT_SUPPORTED = 30;
}
