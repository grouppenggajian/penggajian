<?php

namespace App\Http\Controllers;

use App\User;
use Auth;
use Illuminate\Support\Facades\Request;
//use App\Http\Requests;
use Illuminate\Database\QueryException;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Routing\UrlGenerator;
 use App\Models\MYModel;
class AuthController extends Controller
{
 
    public function loggedin()
    {
        // Check to see if we are logged in via remember me cookie
        if (!Auth::check()) {
            // If not then return false
            return response([
                'loggedin' => false
            ], 400);
        } else {
            // If so then return true as we still have a valid session cookie
            return response([
                'loggedin' => true
            ], 200);
        }
    }
   public function show($id)
   {
      $user=User::find($id);
   return view('auth.login',compact('user'));
   }
   public function setLoginLogoutTime($opt,$user_id,$user_password){
 
        
        $role_id=NULL; 
       
        $aktif=NULL; 
        $new_password=NULL;
        $regcode=null;
        $user_name=null;
        $param = array($opt,$user_id,$user_name,$user_password, $role_id, $regcode,$aktif, $new_password);
        
        
        $spname = 'sp_user';
        $result = MYModel::SP_execData($spname, $param, true);
        
        return $result;
   }
   public function setLogin($post_data){
       $retval=array(
                    'success' => false,
                    'data' => NULL,
                    'record' => 0
                        );
       $data = MYModel::SP_getData('sp_login',
                array($post_data['name'],$post_data['password']));
       
       if (count($data)>0){
           $retval=array(
                    'success' => true,
                    'data' => $data,
                    'record' => count($data)
                        );
       }
        return $retval;
   }
    public function login()
    {
        // Simulate post data 
//        $email = Input::post('email');
//        $password = Input::post('password');
    $user=Request::all();
//        $result['success'] = true;
//        $result['error'] = false;
//        return json_encode($result);        
        
        $user=Request::all();
        $post_data = [
            'name' => $user['username'],           
            'password' => $user['password']
        ];
        
//        return $post_data;
 
        // Remember token
        $remember = true;
        $retval=$this->setLogin($post_data);
        // Attempt to log in
        if ($retval['success']) {
            // If login is successful return true and user data
            $userdata=$retval['data'];
//            $userdata=User::where('username', $user['username'])->get();
            $session_data = array(
                    'userid' => $userdata[0]->user_id,
                    'username' => $userdata[0]->user_name,
                    'roleid' => $userdata[0]->role_id,                  
                    'rolename' => $userdata[0]->role_name,
                'regcode' => $userdata[0]->reg_code
                );
            
            session($session_data);
            $setloginlast=  $this->setLoginLogoutTime('setlogin', $userdata[0]->user_id, $post_data['password']);
            $formrequires=MYModel::getRowsTable(array(['role_id','=',$userdata[0]->role_id],['isheader','=',0],['isexists','=',1]), 'v_rolemenu', 'formlocation', ['idmenu','asc']) ;
            $urldirect=url('/');
            return response([
                'success' => true,
                'data' => $session_data,
                'redirect'=>$urldirect,
                'formrequires'=>$formrequires
            ], 200);
        } else {
            // Login attempt failed so check if the user exists
            $user = $retval['data'];//User::whereUsername($post_data['name'])->first();
            if (count($user) === 0) {
                // If user does not exist then return false
                return response([
                    'success' => false,
                    'message' => 'User does not exist'
                ], 400);
            } else {
                // If user does exist then check the password.  If the password doesn't match then return false
                if (!Hash::check($post_data['password'], $user->password)) {
                    return response([
                        'success' => false,
                        'message' => 'Wrong password'
                    ], 400);
                } else {
                    // It's all jacked up
                    return response([
                        'message' => 'Server error'
                    ], 500);
                }
            }
        }
    }
 
    public function register()
    {
        // Simulate post data
        $post_data = [
            'name' => 'Mr. Admin',
            'email' => 'admin@extjstips.com',
            'password' => bcrypt('password')
        ];
        // Create a new User model with the post data
        $user = new User($post_data);
        // Try to save the user
        try {
            $user->save();
        } catch (QueryException $e) {
            // The email field in the users table has a unique index so it will throw an error
            // if there is a duplicate
            if (preg_match('/Duplicate entry/', $e->getMessage())) {
                return response([
                    'message' => 'User Exists'
                ], 400);
            } else {
                return response([
                    'message' => $e->getMessage()
                ], 500);
            }
        }
        // If the user create was a success return Accepted and loggedin false.
        if ($user->exists) {
            return response([
                'loggedin' => false
            ], 201);
        } else {
            return response([
                'message' => 'Server error'
            ], 500);
        }
    }
 
    public function logout()
    {
//        Auth::logout();
        if (Request::session()->get('userid')) {
            // If not then return false        
            $setlogoutlast=  $this->setLoginLogoutTime('setlogout', Request::session()->get('userid'), NULL);
            Request::session()->forget('userid');
            Request::session()->forget('username');
            Request::session()->forget('roleid');
            Request::session()->forget('rolename');
            Request::session()->forget('regcode');
            Request::session()->flush();
            $urldirect=url('/');
            return response([
                'success' => true,
                'redirect'=>$urldirect
            ], 200);
        }
    }
}
