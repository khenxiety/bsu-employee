import { Component, OnInit } from '@angular/core';
import {Auth,getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,updatePassword,sendPasswordResetEmail} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  name:any
  email:any

  data:any
  c_password:any

  obj:any

  new_name:any
  new_email:any
  new_password:any
  c_new_password:any


  token:any;



  constructor(private router:Router,private toast:ToastrService, private auth:Auth) { 
 
    this.email=localStorage.getItem('email')
    this.token=localStorage.getItem('token')

    
  
    



  }

  ngOnInit(): void {

   
  }




  addAccount(){
    createUserWithEmailAndPassword(this.auth,this.new_email,this.c_new_password).then((res:any)=>{
      
    



      this.toast.success('Account Successfully Created')
     

    })
    .catch((err:any)=>{
      console.log(err)
      this.toast.error('Creating Account failed',err.message)

    })

  }

  updatePasswords(){
    // updatePassword(this.email,this.c_password).then((res:any)=>{
      
    //   this.toast.success('Password Successfully Updated')
     

    // })
    // .catch((err:any)=>{
    //   console.log(err)
    //   this.toast.error('Updating Password failed',err.message)

    // })


    sendPasswordResetEmail(this.auth,this.email).then((res:any)=>{
      this.toast.success('Password Reset Email Sent')

    }).catch((err:any)=>{
      console.log(err)
      this.toast.error('Sending Password Reset Email failed',err.message)

    })


  }

  
}
