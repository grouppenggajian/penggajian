<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Request;
//use App\Http\Requests;
use App\User;
use Auth;
use App\Models\MYModel;
//use App\Models\Loadmenu;

class MainController extends Controller {

    public function index(Request $request) {
        $session = $request->session()->all();  
        $data=array();
        if (array_key_exists('userid', $session)) {
                $data=[
                'success' => true,
                'message' => $request->session()->get('userid')//'User Is Logged In'
            ];
        }else{
            $data=[
                'success' => false,
                'message' => 'User Is Not Logged In'
           ];
        }
//        echo var_dump($data);
////        
        return view('main')->with('data', $data);
        
//        if (!$this->loggedin() AND !$request->is('/auth/login')) {
//
//            if (!$request->ajax()) {
//                // if not ajax request
//                // send back to login page
//                return view('auth.login');
//            } else {
//                // if ajax request
//                // return json message
//                echo '{"success":false,"errMsg":"Session Expired"}';
//                exit;
//            }
//        } else {
//            $session = $request->session()->all();
//            if (!array_key_exists('username', $session)) {
//                return view('auth.login');
//            } else {
//                
//
//                $data['username'] = $session['username'];
//                $data['rolename'] = $session['rolename'];
//                $data['roleid'] = $session['roleid'];
////                $data['head'] = $this->getMenuHeadJsonLocal($session['roleid']);     							
////            echo $data['head'];
////            $this->load->view('main', $data);
//
//                return view('main')->with('data', $data);
//            }
//        }
    }

    public function loggedin() {
        // Check to see if we are logged in via remember me cookie
        if (!Auth::check()) {
            // If not then return false
            return false;
        } else {
            // If so then return true as we still have a valid session cookie
            return true;
        }
    }
public function getMenuHeadJsonLocal($roleid) {
//        $roleid=$request->roleid;
        $query = MYModel::getRowsTable([['role_id', '=', $roleid], ['isheader', '=', true], ['parentmenu', '=', '0']], 'v_rolemenu', [], ['idmenu', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
//        return response([
//                    'success' => true,
//                    'data' => $query,
//                    'record' => count($query)
//                        ], 200);
    }
    public function getMenuHeadJson(Request $request) {
        $roleid=$request->roleid;
        $query = MYModel::getRowsTable([['role_id', '=', $roleid], ['isheader', '=', 1], ['parentmenu', '=', '0']], 'v_rolemenu', [], ['idmenu', 'asc']);
        return json_encode([
                    'success' => true,
                    'data' => $query,
                    'record' => count($query)
                        ]);
//        return response([
//                    'success' => true,
//                    'data' => $query,
//                    'record' => count($query)
//                        ], 200);
    }

    public function get_child_level($findhead, $child, $level) {
        $resArr = array();
//        print 'find '.$findhead."\n";

        foreach ($child as $c) {
            if ($c->parentmenu == $findhead) {
                $levelt = $level + 1;
                //array_push($resArr, array('groupakun'=>$c->groupakun,'kd_akun' => $levelt . '-' . $c->kd_akun, 'nama' => $c->nama, 'jumlah' => $c->jumlah));
//                array_push($resArr, array('groupakun'=>$c->groupakun,'isheader' => $c->header_status,'kd_akun' => $c->kd_akun, 'nama' => $c->nama, 'jumlah' => $c->jumlah,'total' => NULL ));
                $arrget = $this->get_child_level($c->idmenu, $child, $levelt);
                if (count($arrget) > 0) {
                    if($c->icon_cls){
                        array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu, 'iconCls' => $c->icon_cls, 'expanded' => false, 'children' => $arrget));
                    }else{
                        array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu,  'expanded' => false, 'children' => $arrget));
                    }
                    
                } else {
                    if($c->icon_cls){
                        array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu, 'iconCls' => $c->icon_cls, 'leaf' => true));
                    }else{
                        array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu,  'leaf' => true));
                    }
                    
                }
            }
        }
        return $resArr;
    }

    public function get_max_level($head, $child) {
        $resArr = array();
        $level = 0;
//        print json_encode($child)."\n";

        foreach ($head as $h) {
            //array_push($resArr, array('kd_akun' => $level.'-'.$h->kd_akun,'parent_kd_akun' =>''));
            $arrch = $this->get_child_level($h->idmenu, $child, $level);
            if (count($arrch) > 0) {
                if( $h->icon_cls){
                    array_push($resArr, array('id' => $h->idmenu, 'text' => $h->namemenu, 'iconCls' => $h->icon_cls, 'expanded' => true, 'children' => $arrch));
                }else{
                    array_push($resArr, array('id' => $h->idmenu, 'text' => $h->namemenu,  'expanded' => true, 'children' => $arrch));
                }
                
//                foreach ($arrch as $ac) {
//                    array_push($resArr, $ac);
//                }
            } else {
                array_push($resArr, array('id' => $h->idmenu, 'text' => $h->namemenu, 'iconCls' => 'icon-key', 'leaf' => true));
            }
            $level = 0;
        }
        return $resArr;
    }

    public function get_child_level2($findhead, $child, $level) {
        $resArr = array();
//        print 'find '.$findhead."\n";

        foreach ($child as $c) {
            if ($c->parentmenu == $findhead) {
                $levelt = $level + 1;
                //array_push($resArr, array('groupakun'=>$c->groupakun,'kd_akun' => $levelt . '-' . $c->kd_akun, 'nama' => $c->nama, 'jumlah' => $c->jumlah));
//                array_push($resArr, array('groupakun'=>$c->groupakun,'isheader' => $c->header_status,'kd_akun' => $c->kd_akun, 'nama' => $c->nama, 'jumlah' => $c->jumlah,'total' => NULL ));
                $arrget = $this->get_child_level($c->idmenu, $child, $levelt);
                if (count($arrget) > 0) {
                    array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu, 'iconCls' => $c->icon_cls, 'expanded' => false, 'children' => $arrget));
                } else {
                    array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu, 'iconCls' => $c->icon_cls, 'leaf' => true));
                }
            }
        }
        return $resArr;
    }

    public function get_max_level2($head, $child) {
        $resArr = array();
        $level = 0;
//        print json_encode($child)."\n";

        foreach ($head as $h) {
            //array_push($resArr, array('kd_akun' => $level.'-'.$h->kd_akun,'parent_kd_akun' =>''));
            $arrch = $this->get_child_level($h->idmenu, $child, $level);
            if (count($arrch) > 0) {
//                array_push($resArr, array('expanded' => true, 'children' => $arrch));
//                array_push($resArr, array('id'=>$h->idmenu,'text' => $h->namemenu,'iconCls'=>$h->icon_cls,'expanded' => true, 'children' => $arrch));
                foreach ($arrch as $ac) {
                    array_push($resArr, $ac);
                }
            } else {
                array_push($resArr, array('id' => $h->idmenu, 'text' => $h->namemenu, 'iconCls' => 'icon-key', 'leaf' => true));
            }
            $level = 0;
        }
        return $resArr;
    }

    public function get_menu_head($roleid) {
        $query = MYModel::getRowsTable([['role_id', '=', $roleid], ['isheader', '=', true], ['parentmenu', '=', '0']], 'v_rolemenu', [], ['idmenu', 'asc']);

        return $query;
    }

    public function get_menu_child($roleid) {
        $query = MYModel::getRowsTable([['role_id', '=', $roleid], ['parentmenu', '<>', '0']], 'v_rolemenu', [], ['idmenu', 'asc']);

        return $query;
    }

    public function get_accordion_head($headid, $roleid) {
        $query = MYModel::getRowsTable([['role_id', '=', $roleid], ['idmenu', '=', $headid], ['isheader', '=', true], ['parentmenu', '=', '0']], 'v_rolemenu', [], ['idmenu', 'asc']);

        return $query;
    }

    public function getMainMenu(Request $request) {
        $roleid = $request->roleid;
//        echo $roleid;
//        return;
        $head = $this->get_menu_head($roleid);
        $child = $this->get_menu_child($roleid);

        $resArr = array();
        $resArr = $this->get_max_level($head, $child);
        return json_encode($resArr);
    }

    public function getAccordionMenu(Request $request) {
        $headid = $request->headid;
        $roleid = $request->roleid;
        $resArr=MYModel::GetFunction('GetFamilyMenuRoleG',array($roleid,$headid));
        $resArr=  '['.$resArr[0]->retval.']';
//        $roleid = ($this->input->post('roleid', TRUE) ? $this->input->post('roleid', TRUE) : FALSE);
//        $head = $this->get_accordion_head($headid, $roleid);        
//        $child = $this->get_menu_child($roleid);
////        echo json_encode($child);
//
//        $resArr = array();
//        $resArr = $this->get_max_level2($head, $child);
        return $resArr;
    }

}
