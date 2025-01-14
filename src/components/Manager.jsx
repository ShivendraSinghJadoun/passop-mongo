import React from "react";
import { FaEye } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async()=>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()

    // let passwordArray;
   
    console.log(passwords)
      setPasswordArray(passwords);
    
  }

  useEffect(() => {
      getPasswords()
    
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "password";
  };

  const savePassword = async () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){

      // If any such id exist in the  db, delete it
       await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json"}, body: JSON.stringify({ id: form.id})})

      setPasswordArray([...passwordArray, {...form, id: uuidv4()}]); // ... spread
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify({ ...form, id: uuidv4})})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
      // console.log([...passwordArray, form]);
      setForm({ site:"", username:"", password:""})
      toast("Password Saved  !", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true, 
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else{
      toast('Error: Password not saved!')
    }
  };

  const editPassword = (id) => {
    console.log("Edit password with id", id)
    setForm({...passwordArray.filter(i=>i.id===id)[0], id:id})
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
   
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id", id)
    let c = confirm("Do you really want to delete this password")
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id)); 
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));

      let res =  await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json"}, body: JSON.stringify({ id})})

      toast("Password Deleted!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="text-4xl text font-bold   text-center">
          <span className="text-green-600"> &lt;</span>
          Pass
          <span className="text-green-600">OP/&gt;</span>
        </h1>
        <p className="text-green-800 font-bold text-lg text-center">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col p-5  gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-3 py-1"
            type="text"
            name="site"
            id="password"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-3 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-3 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer "
                onClick={showPassword}
              >
                <FaEye />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 hover:bg-green-300 bg-green-400 rounded-full px-3 py-2 w-fit border-2 border-green-800"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save 
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Password to show </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>

                          <div
                            className="lordiconcopy  size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center ">
                        <div className="flex item-center justify-center">
                          <span>{"*".repeat (item.password.length)}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center ">
                        <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wvdxdmpi.json"
                            trigger="hover"
                            style={{"width":"25px","height":"25px"}}>

                            </lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            style={{"width":"25px","height":"25px"}}>

                            </lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
