<?php
//
// Copyright (c) 2008-2020 Nagios Enterprises, LLC. All rights reserved.
//


////////////////////////////////////////////////////////////////////////////////
// STATUS 
////////////////////////////////////////////////////////////////////////////////


/**
 * @param $args
 * @return SimpleXMLElement
 */
function get_xml_program_status($args = array())
{
    return get_backend_cache("get_program_status_xml_output", $args);
}


/**
 * @param $args
 * @return SimpleXMLElement
 */
function get_xml_service_status($args = array())
{
    insert_ndoutils_pending_states(); // Previous existing hack
    return get_backend_cache("get_service_status_xml_output", $args);
}


/**
 * @param $args
 * @return SimpleXMLElement
 */
function get_xml_custom_service_variable_status($args = array())
{
    return get_backend_cache("get_custom_service_variable_status_xml_output", $args);
}


/**
 * @param $args
 * @return SimpleXMLElement
 */
function get_xml_host_status($args = array())
{
    insert_ndoutils_pending_states(); // Previous existing hack
    return get_backend_cache("get_host_status_xml_output", $args);
}


/**
 * @param $args
 * @return SimpleXMLElement
 */
function get_xml_custom_host_variable_status($args = array())
{
    return get_backend_cache("get_custom_host_variable_status_xml_output", $args);
}


/**
 * @param $args
 * @return SimpleXMLElement
 */
function get_xml_comments($args = array())
{
    return get_backend_cache("get_comments_xml_output", $args);
}


////////////////////////////////////////////////////////////////////////////////
// FIX / HACK
////////////////////////////////////////////////////////////////////////////////


/**
 * Newly added and pending hosts/services don't show up for a while unless we do this
 */
function insert_ndoutils_pending_states()
{
    global $db_tables;

    $sql = "SELECT (TIMESTAMPDIFF(SECOND," . $db_tables[DB_NDOUTILS]["programstatus"] . ".program_start_time,NOW())) AS program_run_time, " . $db_tables[DB_NDOUTILS]['programstatus'] . ".* FROM " . $db_tables[DB_NDOUTILS]['programstatus'] . "  WHERE " . $db_tables[DB_NDOUTILS]['programstatus'] . ".instance_id='1'";

    $now = time();

    if (($rs = exec_sql_query(DB_NDOUTILS, $sql))) {
        $runtime = intval($rs->fields["program_run_time"]);
        $starttime = $rs->fields["program_start_time"];
        $stu = strtotime($starttime);
    } else {
        return false;
    }

    $lnsf = get_option("last_ndoutils_status_fix");

    $do_update = false;
    if ($lnsf == "") {
        $do_update = true;
    } else if ($lnsf < $stu && $runtime > 5) {
        $do_update = true;
    }

    // Update ndoutils
    if ($do_update) {

        set_option("last_ndoutils_status_fix", $now);

        // Insert missing service status records
        $sql = "SELECT " . $db_tables[DB_NDOUTILS]['services'] . ".service_object_id AS sid, " . $db_tables[DB_NDOUTILS]['services'] . ".*, " . $db_tables[DB_NDOUTILS]['servicestatus'] . ".* FROM " . $db_tables[DB_NDOUTILS]['services'] . "
LEFT JOIN " . $db_tables[DB_NDOUTILS]['servicestatus'] . " ON " . $db_tables[DB_NDOUTILS]['services'] . ".service_object_id=" . $db_tables[DB_NDOUTILS]['servicestatus'] . ".service_object_id
WHERE servicestatus_id IS NULL";

        if (($rs = exec_sql_query(DB_NDOUTILS, $sql))) {
            while (!$rs->EOF) {
                $sid = intval($rs->fields["sid"]);
                $args = array(
                    "notifications_enabled" => 1,
                    "active_checks_enabled" => 1,
                );
                add_ndoutils_servicestatus($sid, STATE_OK, STATETYPE_HARD, "Service check is pending...", 1, $args);
                $rs->MoveNext();
            }
        }

        // Insert missing host status records
        $sql = "SELECT " . $db_tables[DB_NDOUTILS]['hosts'] . ".host_object_id AS hid, " . $db_tables[DB_NDOUTILS]['hosts'] . ".*, " . $db_tables[DB_NDOUTILS]['hoststatus'] . ".* FROM " . $db_tables[DB_NDOUTILS]['hosts'] . "
LEFT JOIN " . $db_tables[DB_NDOUTILS]['hoststatus'] . " ON " . $db_tables[DB_NDOUTILS]['hosts'] . ".host_object_id=" . $db_tables[DB_NDOUTILS]['hoststatus'] . ".host_object_id
WHERE hoststatus_id IS NULL";

        if (($rs = exec_sql_query(DB_NDOUTILS, $sql))) {
            while (!$rs->EOF) {
                $hid = intval($rs->fields["hid"]);
                $args = array(
                    "notifications_enabled" => 1,
                    "active_checks_enabled" => 1,
                );
                add_ndoutils_hoststatus($hid, STATE_UP, STATETYPE_HARD, "Host check is pending...", 1, $args);
                $rs->MoveNext();
            }
        }

    }
}
