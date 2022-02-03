import React,{useState} from 'react';
import { useEffect } from 'react';

var url='http://localhost:8081/'
const House = () => {

    const [house,getHouse]=useState([]);
    const [disp,dispHouse]=useState([]);

    function postDetail()
    {
        var each={
            houseId:0,
            houseNo:'',
            status:'',
            type:''
        }
        each.houseId=document.getElementById("hid").value;
        each.houseNo=document.getElementById("hno").value;
        each.status=document.getElementById("status").value;
        each.type=document.getElementById("type").value;
        console.log(each)
        fetch(url+"saveHouse", {
            method: "POST",
            body: JSON.stringify(each),
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        document.getElementById("hid").value  =   '';
        document.getElementById("hno").value   =   '';
        document.getElementById("status").value  =   '';
        document.getElementById("type").value =   '';
    }

    function deletes(id)
    {       
        console.log(id);
        fetch(url+"deleteHouse/"+id, {
            method: "POST",
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
        })
    }


    function dispId()
    {
        var id=document.getElementById("did").value;
        fetch(url+"getHouse/"+id)
        .then((res)=>res.json())
        .then((json)=>{
            dispHouse(json)
        })
        document.getElementById("did").value='';

    }

    function dispType()
    {
        var type=document.getElementById("dtype").value;
        fetch(url+"getByType/"+type)
        .then((res)=>res.json())
        .then((json)=>{
            dispHouse(json)
        })
        document.getElementById("dtype").value='';

    }
 
    useEffect(()=>{
        fetch(url+'getAllHouse')
        .then((res)=>res.json())
        .then((json)=>{
            getHouse(json)
        })
    },[])

    return (
        <div>
            <h1>House Management</h1>
            <br></br>
            <h3>Please Refersh To see The Results For Insert And Delete Houses</h3>
            <br></br>
            <div className="whole">
                <div className="each">
                    <h2>Add House</h2>
                    <input type="text" placeholder="House Id" id="hid"></input><br></br><br></br>
                    <input type="text" placeholder="House No" id="hno"  ></input><br></br><br></br>
                    <input type="text" placeholder="Status" id="status" ></input><br></br><br></br>
                    <input type="text" placeholder="Type" id="type"></input><br></br><br></br>
                    <button onClick={postDetail}>submit</button> 
                </div>

                <div className="each">
                    <h2>Display By id</h2>
                    <input type="text" placeholder="House Id" id="did"></input><br></br><br></br>
                    <button onClick={dispId}>submit</button> <br></br><br></br>
                    
                </div>
                <div className="each">
                    <h2>Display By Type</h2>
                    <input type="text" placeholder="House Type" id="dtype"></input><br></br><br></br>
                    <button onClick={dispType}>submit</button> <br></br><br></br>
                    {/* {disp.map((input,index)=>{
                        return(
                        <div className="each">
                        <div className="each-ele">
                            <p>ID : {input.houseId} </p>
                            <p>House No : {input.houseNo} </p>
                            <p>STATUS : {input.status} </p>
                            <p>TYPE : {input.type} </p>
                        </div><br></br><br></br>
                        <button onClick={()=>{deletes(input.houseId)}}>delete</button>
                        </div> )
                    })} */}
                </div>

            </div>
            <br></br><br></br><br></br>
            <div className="lr">
                <div><h2>All Data</h2></div>
                <div><h2>Display</h2></div>
            </div>
            <br></br>
            <div className="display">
                <div className="left">
                    {house.map((input,index)=>{
                        return(
                        <div className="each">
                            <div className="each-ele">
                                <p>ID : {input.houseId} </p>
                                <p>NO : {input.houseNo} </p>
                                <p>STATUS : {input.status} </p>
                                <p>TYPE : {input.type} </p>
                            </div><br></br><br></br>
                            <button onClick={()=>{deletes(input.houseId)}}>DELETE</button>
                        </div>  )
                    })}
                </div>
                <div>
                    {disp.map((input,index)=>{
                                return(
                                <div className="each">
                                <div className="each-ele">
                                    <p>ID : {input.houseId} </p>
                                    <p>House No : {input.houseNo} </p>
                                    <p>STATUS : {input.status} </p>
                                    <p>TYPE : {input.type} </p>
                                </div><br></br><br></br>
                                <button onClick={()=>{deletes(input.houseId)}}>delete</button>
                                </div> )
                        })}
                </div>
            </div>
            <br></br><br></br>
           
        </div>
    )
}

export default House
