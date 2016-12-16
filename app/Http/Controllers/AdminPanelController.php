<?php
namespace App\Http\Controllers;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AdminPanelController
 *
 * @author miyzan
 */
use Illuminate\Http\Request;
use App\Models\MYModel;
class AdminPanelController extends Controller{
    //put your code here
    public function roleMaster(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
//        echo $request->searchvalue;
//        return;
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
        if($query){
            $sqlsearch=array('where'=>array(['role_id', 'LIKE', '%'.$query.'%']),'orwhere'=>array(['role_name', 'LIKE', '%'.$query.'%']));
        }

        $data = MYModel::getRowsTableQueryLimit('sys_role',$sqlsearch,$start,$limit);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);
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
                    array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu, 'iconCls' => $c->icon_cls, 'expanded' => false, 'children' => $arrget));
                } else {
                    array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu, 'iconCls' => $c->icon_cls, 'leaf' => true));
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
                array_push($resArr, array('id' => $h->idmenu, 'text' => $h->namemenu, 'iconCls' => $h->icon_cls, 'expanded' => true, 'children' => $arrch));
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
    
    public function get_menu_head($roleid) {
        $query = MYModel::getRowsTable([['role_id', '=', $roleid], ['isheader', '=', true], ['parentmenu', '=', '0']], 'v_rolemenu', [], ['idmenu', 'asc']);

        return $query;
    }

    public function get_menu_child($roleid) {
        $query = MYModel::getRowsTable([['role_id', '=', $roleid], ['parentmenu', '<>', '0']], 'v_rolemenu', [], ['idmenu', 'asc']);

        return $query;
    }
    
    public function roleDetail(Request $request) {
        $roleid = $request->roleid?$request->roleid:NULL;
        
        $head = $this->get_menu_head($roleid);
        $child = $this->get_menu_child($roleid);

        $resArr = array();
        $resArr = $this->get_max_level($head, $child);
        return json_encode($resArr);
        
        
    }
    
    public function get_menu_head_all($checked,$roleid) {       
        $param=array($checked,0,$roleid);
        $spname = 'sp_get_all_menu';
        $result=MYModel::SP_getData($spname,$param);
        
        return $result;
    }
    
    public function get_menu_child_all($checked,$roleid) {     
        $param=array($checked,1,$roleid);
        $spname = 'sp_get_all_menu';
        $result=MYModel::SP_getData($spname,$param);
        return $result;
    }
    
    public function get_child_level_all($findhead, $child, $level) {
        $resArr = array();
        $hselect = false;
        foreach ($child as $c) {
            if ($c->parentmenu == $findhead) {
                $hselect = false;
                if ($c->selected == 0) {
                    $hselect = false;
                } elseif ($c->selected == 1) {
                    $hselect = true;
                }
                $levelt = $level + 1;
                $arrget = $this->get_child_level_all($c->idmenu, $child, $levelt);
                if (count($arrget) > 0) {
                    array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu, 'expanded' => true, 'checked' => $hselect, 'children' => $arrget));
                } else {
                    array_push($resArr, array('id' => $c->idmenu, 'text' => $c->namemenu, 'iconCls' => 'icon-save', 'checked' => $hselect, 'leaf' => true));
                }
            }
        }
        return $resArr;
    }

    public function get_max_level_All($head, $child) {
        $resArr = array();
        $level = 0;
        $hselect = false;
        foreach ($head as $h) {
            $hselect = false;
            if ($h->selected == 0) {
                $hselect = false;
            } elseif ($h->selected == 1) {
                $hselect = true;
            }
            $arrch = $this->get_child_level_all($h->idmenu, $child, $level);
            if (count($arrch) > 0) {
                array_push($resArr, array('id' => $h->idmenu, 'text' => $h->namemenu, 'expanded' => true, 'checked' => $hselect, 'children' => $arrch));
            } else {
                array_push($resArr, array('id' => $h->idmenu, 'text' => $h->namemenu, 'iconCls' => 'icon-save', 'leaf' => true, 'checked' => $hselect));
            }
            $level = 0;
        }
        return $resArr;
    }
    
    public function roleDetailAll(Request $request) {
        $role_id = $request->roleid?$request->roleid:NULL;
        $checked = $request->checked?$request->checked:0;
//        echo $role_id.'|'.$checked;
        $head = $this->get_menu_head_all($checked,$role_id);
        $child = $this->get_menu_child_all($checked,$role_id);
//        echo json_encode($head) .' '. json_encode($child);
        $resArr = array();
        $resArr = $this->get_max_level_all($head, $child);
        return json_encode($resArr);
    }
    public function saveRole(Request $request) {
        
        $opt = $request->cmd?$request->cmd:NULL;
        $role_id = $request->role_id?$request->role_id:NULL;
        $role_name = $request->role_name?$request->role_name:NULL;
        $active = $request->active?$request->active:NULL;
        $data = $request->rolemenu?json_decode($request->rolemenu):array();
        if ($active=='on'){
            $active=1;
        }else{
            $active=0;
        }
//        echo $opt.' '.$role_id;
//        return;
        $result='';
        $param = array($opt, $role_id, $role_name, $active);
        $spname = 'sp_role';
        $retval = MYModel::SP_execData($spname, $param, true);
        
//        $jresult = json_decode($retval);
        
            if ($retval['success']) {
                $param = array('delete', $role_id, NULL);
                $spname = 'sp_rolemenu';
                $result = MYModel::SP_execData($spname, $param, true);

                foreach ($data as $r) {
                    $param = array('insert', $role_id, $r->idmenu);
                    $spname = 'sp_rolemenu';
                    $result = MYModel::SP_execData($spname, $param, true);
                }
            }
      
        return response($retval,200);
    }
    public function deleteRole(Request $request) {
        
        $opt = $request->cmd?$request->cmd:NULL;
        
        $data = $request->postdata?json_decode($request->postdata):array();
        $role_id=$data->role_id;
        $role_name='';
        $active=0;
        
        
        $param = array($opt, $role_id,$role_name, $active);
        $spname = 'sp_role';
        $result = MYModel::SP_execData($spname, $param, true);
        return response($result,200);
    }
    
    public function loadUser(Request $request){
        $start = $request->start?$request->start:0;
        $limit = $request->limit?$request->limit:0;
//        echo $request->searchvalue;
//        return;
        $query=$request->searchvalue?$request->searchvalue:NULL;
        
        $sqlsearch=NULL;
        if($query){
            $sqlsearch=array('where'=>array(['user_id', 'LIKE', '%'.$query.'%']),'orwhere'=>array(['user_name', 'LIKE', '%'.$query.'%'],['role_name', 'LIKE', '%'.$query.'%']));
        }

        $data = MYModel::getRowsTableQueryLimit('v_user',$sqlsearch,$start,$limit);
        return json_encode([
                    'success' => true,
                    'data' => $data[0],
                    'record' => $data[1]
                        ]);
    }
    
    public function saveUser(Request $request) {
        
        $opt = $request->cmd?$request->cmd:'';
        $user_id = $request->user_id?$request->user_id:NULL;
        $user_name = $request->user_id?$request->user_name:NULL;
        $user_password = $request->user_password?$request->user_password:'';
        $new_password = $request->user_password?$request->user_password:'';
        $role_id = $request->role_id?$request->role_id:NULL;        
        $regcode = $request->reg_code?$request->reg_code:NULL;
        $aktif = $request->aktif?$request->aktif:false;
        
        if ($aktif=='on'){
            $aktif=1;
        }else{
            $aktif=0;
        }

        $result='';
        $param = array($opt,$user_id,$user_name,$user_password, $role_id, $regcode,$aktif, $new_password);
        $spname = 'sp_user';
        $retval = MYModel::SP_execData($spname, $param, true);
        
        
        return response($retval,200);
    }
    
    public function deleteUser(Request $request) {
        
        $opt = $request->cmd?$request->cmd:NULL;
        
        $data = $request->postdata?json_decode($request->postdata):array();
        
        
        
        $param = array($opt, $data->user_id,NULL,NULL, NULL, NULL,NULL, NULL);
        $spname = 'sp_user';
        $result = MYModel::SP_execData($spname, $param, true);
        return response($result,200);
    }
    
    public function aktifUser(Request $request) {
        $opt = $request->cmd?$request->cmd:NULL;        
        $data = $request->postdata?json_decode($request->postdata):array();
        
        $user_id=$data->user_id;
        $user_password=NULL;
        $role_id=NULL; 
       
        $aktif=$data->aktif; 
        $new_password=NULL;
        $regcode=null;
        $user_name=null;
        $param = array($opt,$user_id,$user_name,$user_password, $role_id, $regcode,$aktif, $new_password);
        
        
        $spname = 'sp_user';
        $result = MYModel::SP_execData($spname, $param, true);
        return response($result,200);
        
    }
    public function resetPassword(Request $request) {
        $opt = $request->cmd?$request->cmd:NULL;    
        $user_id = $request->user_id?$request->user_id:NULL;        
        $user_password = $request->user_password?$request->user_password:'';
        
//        $user_id=$data->user_id;
//        $user_password=$data->user_password;
        $role_id=NULL; 
        
        $regcode=null;
        $aktif=NULL; 
        $new_password=NULL;
        $user_name=null;
        
        $param = array($opt,$user_id,$user_name,$user_password, $role_id,$regcode, $aktif, $new_password);
        $spname = 'sp_user';
        $result = MYModel::SP_execData($spname, $param, true);
        return response($result,200);
        
    }
    public function updatePassword(Request $request) {
        $opt = $request->cmd?$request->cmd:NULL;        
        $user_id = $request->user_id?$request->user_id:NULL;        
        $user_password = $request->user_password?$request->user_password:'';
        $new_password = $request->new_password?$request->new_password:'';
//        $data = isset($_POST['postdata']) ? json_decode($this->input->post('postdata', TRUE)): array(); 
        
//        $user_id=$data->user_id;
//        $user_password=$data->user_password;
        $role_id=NULL; 
       
        $aktif=NULL; 
        $regcode=null;
//        $new_password=$data->new_password;
        $user_name=null;
        
        $param = array($opt,$user_id,$user_name,$user_password, $role_id,$regcode,$aktif, $new_password);
        $spname = 'sp_user';
        $result = MYModel::SP_execData($spname, $param, true);
        return response($result,200);
        
    }
    
}

?>
