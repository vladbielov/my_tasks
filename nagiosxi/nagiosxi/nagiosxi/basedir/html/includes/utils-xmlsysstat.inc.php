<?php
//
// Copyright (c) 2008-2020 Nagios Enterprises, LLC. All rights reserved.
//


////////////////////////////////////////////////////////////////////////////////
// SYSSTAT DATA
////////////////////////////////////////////////////////////////////////////////


/**
 * Get the sysstat data in XML or array format
 *
 * @param   array   $request_args   Array of request arguments
 * @param   bool    $xml            True for XML false for raw array
 * @return  mixed                   String of XML or array     
 */
function get_sysstat_data_xml_output($request_args = null, $xml = true)
{

    global $db_tables;

    $output = "";

    // only let authorized users see this
    if (is_authorized_for_monitoring_system() == false) {
        exit;
    }

    $sql = "SELECT * FROM " . $db_tables[DB_NAGIOSXI]["sysstat"] . "";
    if (!($rs = exec_sql_query(DB_NAGIOSXI, $sql, false))) {
        //handle_backend_db_error(DB_NAGIOSXI);
    } else {
        //output_backend_header();
        $output .= "<sysstatinfo>\n";

        while (!$rs->EOF) {

            $metric = $rs->fields["metric"];
            $rawvalue = $rs->fields["value"];
            $update_time = $rs->fields["update_time"];

            $value = mb_unserialize($rawvalue);

            switch ($metric) {
                case "load":
                    $output .= "<load>\n";
                    $output .= "<updated>" . $update_time . "</updated>\n";
                    $output .= "<load1>" . $value["load1"] . "</load1>\n";
                    $output .= "<load5>" . $value["load5"] . "</load5>\n";
                    $output .= "<load15>" . $value["load15"] . "</load15>\n";
                    $output .= "</load>\n";
                    break;
                case "swap":
                    $output .= "<swap>\n";
                    $output .= "<updated>" . $update_time . "</updated>\n";
                    $output .= "<total>" . $value["total"] . "</total>\n";
                    $output .= "<used>" . $value["used"] . "</used>\n";
                    $output .= "<free>" . $value["free"] . "</free>\n";
                    $output .= "</swap>\n";
                    break;
                case "memory":
                    $output .= "<memory>\n";
                    $output .= "<updated>" . $update_time . "</updated>\n";
                    $output .= "<total>" . $value["total"] . "</total>\n";
                    $output .= "<used>" . $value["used"] . "</used>\n";
                    $output .= "<free>" . $value["free"] . "</free>\n";
                    $output .= "<shared>" . $value["shared"] . "</shared>\n";
                    $output .= "<buffers>" . $value["buffers"] . "</buffers>\n";
                    $output .= "<cached>" . $value["cached"] . "</cached>\n";
                    $output .= "</memory>\n";
                    break;
                case "iostat":
                    $output .= "<iostat>\n";
                    $output .= "<updated>" . $update_time . "</updated>\n";
                    $output .= "<user>" . $value["user"] . "</user>\n";
                    $output .= "<nice>" . $value["nice"] . "</nice>\n";
                    $output .= "<system>" . $value["system"] . "</system>\n";
                    $output .= "<iowait>" . $value["iowait"] . "</iowait>\n";
                    $output .= "<steal>" . $value["steal"] . "</steal>\n";
                    $output .= "<idle>" . $value["idle"] . "</idle>\n";
                    $output .= "</iostat>\n";
                    break;
                case "daemons":
                    $output .= "<daemons>\n";
                    $output .= "<updated>" . $update_time . "</updated>\n";
                    foreach ($value as $dname => $darr) {
                        $output .= "<daemon id='" . $dname . "'>\n";
                        $output .= "<name>" . $darr["daemon"] . "</name>\n";
                        $output .= "<output>" . $darr["output"] . "</output>\n";
                        $output .= "<return_code>" . $darr["return_code"] . "</return_code>\n";
                        $output .= "<status>" . $darr["status"] . "</status>\n";
                        $output .= "</daemon>\n";
                    }
                    $output .= "</daemons>\n";
                    break;
                case "nagioscore":
                    $output .= "<nagioscore>\n";
                    $output .= "<updated>" . $update_time . "</updated>\n";
                    //$output.="<rawvalue>".$rawvalue."</rawvalue>\n";
                    //$output.="<value>".print_r($value)."</value>\n";

                    foreach ($value as $vname => $varr) {

                        switch ($vname) {
                            case "activehostcheckperf":
                                $output .= "<activehostcheckperf>\n";
                                $output .= "<min_latency>" . $varr["min_latency"] . "</min_latency>\n";
                                $output .= "<max_latency>" . $varr["max_latency"] . "</max_latency>\n";
                                $output .= "<avg_latency>" . $varr["avg_latency"] . "</avg_latency>\n";
                                $output .= "<min_execution_time>" . $varr["min_execution_time"] . "</min_execution_time>\n";
                                $output .= "<max_execution_time>" . $varr["max_execution_time"] . "</max_execution_time>\n";
                                $output .= "<avg_execution_time>" . $varr["avg_execution_time"] . "</avg_execution_time>\n";
                                $output .= "</activehostcheckperf>\n";
                                break;
                            case "activeservicecheckperf":
                                $output .= "<activeservicecheckperf>\n";
                                $output .= "<min_latency>" . $varr["min_latency"] . "</min_latency>\n";
                                $output .= "<max_latency>" . $varr["max_latency"] . "</max_latency>\n";
                                $output .= "<avg_latency>" . $varr["avg_latency"] . "</avg_latency>\n";
                                $output .= "<min_execution_time>" . $varr["min_execution_time"] . "</min_execution_time>\n";
                                $output .= "<max_execution_time>" . $varr["max_execution_time"] . "</max_execution_time>\n";
                                $output .= "<avg_execution_time>" . $varr["avg_execution_time"] . "</avg_execution_time>\n";
                                $output .= "</activeservicecheckperf>\n";
                                break;
                            default:
                                $output .= "<" . $vname . ">\n";
                                $output .= "<val1>" . $varr["1min"] . "</val1>\n";
                                $output .= "<val5>" . $varr["5min"] . "</val5>\n";
                                $output .= "<val15>" . $varr["15min"] . "</val15>\n";
                                $output .= "</" . $vname . ">\n";
                                break;
                        }
                    }

                    $output .= "</nagioscore>\n";
                    break;
                case "dbbackend":
                    $output .= "<dbbackend>\n";
                    foreach ($value as $vname => $vval) {
                        $output .= "<" . $vname . ">" . $vval . "</" . $vname . ">\n";
                    }
                    $output .= "</dbbackend>\n";
                    break;
                default:
                    $output .= "<" . $metric . ">\n";
                    foreach ($value as $vname => $vval) {
                        $output .= "<" . $vname . ">" . $vval . "</" . $vname . ">\n";
                    }
                    $output .= "</" . $metric . ">\n";
                    break;
            }

            $rs->MoveNext();
        }

        $output .= "</sysstatinfo>\n";
    }

    return $output;
}


/**
 * Get connection information from NDOutils
 *
 * @param   array   $request_args   Array of request arguments
 * @param   bool    $xml            True for XML false for raw array
 * @return  mixed                   String of XML or array     
 */
function get_ndoutils_info_xml($args = array(), $xml = true)
{
    global $request;
    global $sqlquery;
    global $db_tables;

    // generate query
    $fieldmap = array(
        "conninfo_id" => $db_tables[DB_NDOUTILS]["conninfo"] . ".conninfo_id",
        "instance_id" => $db_tables[DB_NDOUTILS]["conninfo"] . ".instance_id",
        "agent_name" => $db_tables[DB_NDOUTILS]["conninfo"] . ".agent_name",
        "agent_version" => $db_tables[DB_NDOUTILS]["conninfo"] . ".agent_version",
        "disposition" => $db_tables[DB_NDOUTILS]["conninfo"] . ".disposition",
        "connect_source" => $db_tables[DB_NDOUTILS]["conninfo"] . ".connect_source",
        "connect_type" => $db_tables[DB_NDOUTILS]["conninfo"] . ".connect_type",
        "connect_time" => $db_tables[DB_NDOUTILS]["conninfo"] . ".connect_time",
        "disconnect_time" => $db_tables[DB_NDOUTILS]["conninfo"] . ".disconnect_time",
        "last_checkin_time" => $db_tables[DB_NDOUTILS]["conninfo"] . ".last_checkin_time",
        "data_start_time" => $db_tables[DB_NDOUTILS]["conninfo"] . ".data_start_time",
        "data_end_time" => $db_tables[DB_NDOUTILS]["conninfo"] . ".data_end_time",
        "bytes_processed" => $db_tables[DB_NDOUTILS]["conninfo"] . ".bytes_processed",
        "lines_processed" => $db_tables[DB_NDOUTILS]["conninfo"] . ".lines_processed",
        "entries_processed" => $db_tables[DB_NDOUTILS]["conninfo"] . ".entries_processed",
    );
    $instanceauthfields = array(
        "instance_id"
    );
    $args = array(
        "sql" => $sqlquery['GetConnInfo'],
        "fieldmap" => $fieldmap,
        "instanceauthfields" => $instanceauthfields,
        "instanceauthperms" => P_READ,
        "useropts" => $args
    );
    $sql = generate_sql_query(DB_NDOUTILS, $args);

    if ($rs = exec_sql_query(DB_NDOUTILS, $sql)) {
        if ($xml) {
            // Generate XML
            $outputtype = grab_request_var("outputtype", "");
            $output = "<conninfolist>\n";
            $output .= "  <recordcount>" . $rs->RecordCount() . "</recordcount>\n";

            if (!isset($request["totals"])) {
                while (!$rs->EOF) {

                    if ($outputtype == "json") {
                        $output .= "  <conninfo>\n";
                        $output .= xml_db_field(2, $rs, 'conninfo_id', 'id', true);
                    } else {
                        $output .= "  <conninfo id='" . db_field($rs, 'conninfo_id') . "'>\n";
                    }

                    $output .= xml_db_field(2, $rs, 'instance_id', '', true);
                    $output .= xml_db_field(2, $rs, 'agent_name', '', true);
                    $output .= xml_db_field(2, $rs, 'agent_version', '', true);
                    $output .= xml_db_field(2, $rs, 'disposition', '', true);
                    $output .= xml_db_field(2, $rs, 'connect_source', '', true);
                    $output .= xml_db_field(2, $rs, 'connect_type', '', true);
                    $output .= xml_db_field(2, $rs, 'connect_time', '', true);
                    $output .= xml_db_field(2, $rs, 'disconnect_time', '', true);
                    $output .= xml_db_field(2, $rs, 'last_checkin_time', '', true);
                    $output .= xml_db_field(2, $rs, 'data_start_time', '', true);
                    $output .= xml_db_field(2, $rs, 'data_end_time', '', true);
                    $output .= xml_db_field(2, $rs, 'bytes_processed', '', true);
                    $output .= xml_db_field(2, $rs, 'lines_processed', '', true);
                    $output .= xml_db_field(2, $rs, 'entries_processed', '', true);
                    $output .= "  </conninfo>\n";

                    $rs->MoveNext();
                }
            }
            $output .= "</conninfolist>\n";

            return $output;
        }  else {
            return $rs->GetArray();
        }
    }

    return false;
}
