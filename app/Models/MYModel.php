<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MYModel extends Model {

    protected $db;

//    public function __construct()
//   {
//       $this->db = new \Illuminate\Support\Facades\DB;
//   }

    protected function getFieldsTable($table) {
        return DB::getSchemaBuilder()->getColumnListing($table);
    }
    protected function getDBTable($table) {
        return $this->db = DB::table($table);
    }
    protected function setInsertRow($table, $data = NULL) {
        $this->db = DB::table($table);
//        $column = $this->getFieldsTable($table);
//        $valInsert = array();
//        $valColumn = array();
//
//        foreach ($column as $key =>$col) {
//
//            $valColumn[$key] = $col;
//        }
//        array_push($valInsert, $valColumn);
//        $valColumn = array();

        if ($this->db->insert($data)) {
            $affected = 1;
        } else {
            $affected = 0;
        }
        ;
        return $affected;
    }
    
    protected function setUpdateRow($table, $wheredata=NULL,$data = NULL) {
        $this->db = DB::table($table);        
        $valInsert = array();
        $valColumn = array();

        
        if($wheredata){
            $this->db->where($wheredata);
        }
        
        if ($this->db->update($data)) {
            $affected = 1;
        } else {
            $affected = 0;
        }
        ;
        return $affected;
    }
    
    protected function setDeleteRow($table, $wheredata=NULL) {
        $this->db = DB::table($table);        
        if($wheredata){
            $this->db->where($wheredata);
        }
        
        if ($this->db->delete()) {
            $affected = 1;
        } else {
            $affected = 0;
        }
        ;
        return $affected;
    }

    protected function getRowsTable($sql_search = NULL, $table=NULL, $select = NULL, $order = NULL) {
        $this->db = DB::table($table);
        if ($sql_search) {
            $this->db->where($sql_search);
        }
        if ($select) {
            $this->db->select($select);
        }
        if ($order) {
            $this->db->orderBy($order[0], $order[1]);
        }

        $query = $this->db->get();

        return $query;
    }
    
    protected function getRowsTableWhereOr($table=NULL,$sql_search = NULL,$order = NULL) {
        $this->db = DB::table($table);
        
        if ($sql_search) {
            foreach ($sql_search as $key => $value) {
                if($key=='where'){
                    $this->db->where($value);
                }
                if($key=='orwhere'){
                    foreach ($value as $val) {
                        $this->db->orWhere(array($val));                        
                    }
                        
                    
                    
                }
            }
            
        }
        if ($order) {
            $this->db->orderBy($order[0], $order[1]);
        }
        $queryall = $this->db->get();  
        $totalrec=count($queryall);

        return array($queryall,$totalrec);
    }
    
    protected function getRowsTableAllLimit($table=NULL,$offset=0,$limit=0) {
        $queryall = DB::table($table)                
                ->get();  
        $totalrec=count($queryall);
        $query = DB::table($table)->offset($offset)
                ->limit($limit)
                ->get();       

        return array($query,$totalrec);
    }
    
    protected function getRowsTableQueryLimit($table=NULL,$sql_search = NULL,$offset=0,$limit=0,$order = NULL) {
        $this->db = DB::table($table);
        
        if ($sql_search) {
            foreach ($sql_search as $key => $value) {
                if($key=='where'){
                    $this->db->where($value);
                }
                if($key=='orwhere'){
                    foreach ($value as $val) {
                        $this->db->orWhere(array($val));                        
                    }
                        
                    
                    
                }
            }
            
        }
        $queryall = $this->db->get();  
        $totalrec=count($queryall);
        
        $this->db = DB::table($table);
        if ($sql_search) {
            foreach ($sql_search as $key => $value) {
                if($key=='where'){
                    $this->db->where($value);
                }
                if($key=='orwhere'){
                    foreach ($value as $val) {
                        $this->db->orWhere(array($val));                        
                    }
                }
            }
        }
        if ($order) {
            $this->db->orderBy($order[0], $order[1]);
        }
        $this->db->offset($offset);
        $this->db->limit($limit);
        $query = $this->db->get(); 
                    

        return array($query,$totalrec);
    }
    protected function getDataUser()
    {
        $raw=DB::select('call get_user()');                        
        return $raw;
    }
    
    protected function getsetIdMaster($opt='get',$vkode =null,$depan =0,$vlength =10)
    {
        if($opt=='get'){
            $raw=DB::select('select getidmaster('."'$vkode'".",$depan".",$vlength".') as idmaster');                        
        }else{
            $raw=DB::select('select genidmaster('."'$vkode'".",$depan".",$vlength".')  as idmaster');                        
        }
        
        return $raw;
    }
    
    protected function GetFunction($functname,$param = NULL)
    {
        if ($param) {
            $genparam='';
            for($i=0;$i<count($param);$i++){
                if(!is_null($param[$i])){
                    $genparam.="'".$param[$i]."'";
                }else{
                    $genparam.='null';
                }
                
                if($i<count($param)-1){
                    $genparam.=",";
                }
            }
//            $genparam = join(',', array_fill(0, count($param), '?'));
            $raw=DB::select("select $functname($genparam) as retval");  
            
        } else {
            $raw=DB::select("select $functname() as retval");  
        }
                                  
        
        
        return $raw;
    }
    protected function SP_getData($spname, $param = NULL) {
        $sql = "";
        $query = NULL;
        if ($param) {
            $genparam='';
            for($i=0;$i<count($param);$i++){
                if(!is_null($param[$i])){
                    $genparam.="'".$param[$i]."'";
                }else{
                    $genparam.='null';
                }
                
                if($i<count($param)-1){
                    $genparam.=",";
                }
            }
//            $genparam = join(',', array_fill(0, count($param), '?'));
            $sql = "call $spname($genparam)";
            $query = DB::select($sql); 
        } else {
            $sql = "call $spname()";
            $query = DB::select($sql);
        }

        
        return $query;
    }
    
    protected function SP_execData($spname, $param = NULL, $msg = false) {
        $sql = "";
        $query = NULL;
        if ($param) {
            $genparam='';
            for($i=0;$i<count($param);$i++){
                if(!is_null($param[$i])){
                    if($param[$i]==''){
                        $genparam.='null';
                    }else{
                    $genparam.="'".$param[$i]."'";
                    }
                }else{                    
                    $genparam.='null';
                }
                
                
                if($i<count($param)-1){
                    $genparam.=",";
                }
            }
//            $genparam = join(',', array_fill(0, count($param), '?'));
            $sql = "call $spname($genparam)";
//            echo $sql;
//             $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
//            $mpdo =DB::getPdo();
//            $mpdo ->setAttribute($mpdo->ATTR_EMULATE_PREPARES, true);
            $query = DB::select($sql); 
        } else {
            $sql = "call $spname()";
            $query = DB::select($sql);
        }

        
        $total = count($query);
$json=array();
        if ($msg) {
            if ($total > 0) {
                $query=$query[0];
                    if ($query->success) {
                        $success = true;
                        $message= $query->message;
                    } else {
                        $success = false;
                        $message = $query->message;
                    }


                    $json = array(
                        "success" => $success,
                        "message" => $message
                    );
                
                $results = json_encode($json);
            } else {
                $json = array(
                    "success" => true,
                    "message" => 'Execute Successfull'
                );
                $results = json_encode($json);
            }
        } else {
            if ($total > 0) {
                $json = array(
                    "success" => true,
                    "message" => 'Execute Successfully'
                );
                $results = json_encode($json);
            } else {
                $json = array(
                    "success" => false,
                    "message" => 'Execute Aborted'
                );
                $results = json_encode($json);
            }
        }
//        $query->next_result();
//        $query->free_result();
        return $json;
    }

}
