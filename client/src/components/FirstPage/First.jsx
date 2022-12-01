import React from 'react';
import '/After/client/src/components/FirstPage/first.css'
import regh from '/After/client/src/assets/img/100.png'
import str from '/After/client/src/assets/img/Strel.png'
import Done from '/After/client/src/assets/img/Done.png'
import Add from '/After/client/src/assets/img/Add.png'


const First = () => {
    

    function registration(){
        window.location.assign('http://localhost:3001/registration');
      };
    function login(){
        window.location.assign('http://localhost:3001/login');
      };

return(

        

        
    <div class="section4">
    <div class="pick">
        <div class="pickhead">
            What is&nbsp;<div className="MyCloud">MY CLOUD</div> 
        </div>
        <div class="weknow">
            A personal cloud for your data, where your files are securely protected. Save important documents and memories in our storage facility.
        </div>
        <div class="howit">
        How to work with this?
        </div>
    <div class="HOWITE">
        <div class="card">
        <img src={regh} alt="as" id='reg' className='reg'/>
        </div>
        <div class="cardtext">At first you need to register at MyCloud! Then log in! </div>
        <div class="vector"><img src={str} alt="str" className='strel'/></div>

        <div class="tree">
        <img src={Add} alt="add" className='add'/>
        </div>
        <div class="zootext">In the next step you can add your files, then can manage them in your storage!</div>
        <div class="vector2"><img src={str} alt="str" className='strel'/></div>

        <div class="monkey">
        <img src={Done} alt="done" className='done'/>
        </div>
        <div class="montext">Done, enjoy using it!</div>
    </div>
        
        <button class="btn3" >
            <div class="btn3t" onClick={()=>login()}>Get into your cloud!</div>
        </button>
        <button class="btn4" >
            <div class="btn3t" onClick={()=>registration()}>Register now!</div>
        </button>
    </div>





        {/* <div className="whats">
         What is&nbsp;<div className="MyCloud">MY CLOUD</div> 
        </div>
        <div className="about">
        A personal cloud of your data, where your files are protected.
        </div>
 
        <button className="logmain" onClick={() => login()}>Login</button> 
        <button className="regmain" onClick={() => registration()}>Registration</button>  */}


        

    </div>
)
};

export default First;

