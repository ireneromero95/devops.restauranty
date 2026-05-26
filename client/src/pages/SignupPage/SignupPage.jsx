// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import authService from "../../services/auth.service";
// import { MdEmail } from "react-icons/md"
// import { FaLock, FaCircleUser, FaRegCircleUser, FaLocationDot, FaPhoneFlip } from "react-icons/fa6"

// function SignupPage() {
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setphoneNumber] = useState("");
//   const [errorMessage, setErrorMessage] = useState(undefined);

//   const navigate = useNavigate();

//   const handleEmail = (e) => setEmail(e.target.value);
//   const handlePassword = (e) => setPassword(e.target.value);
//   const handleName = (e) => setName(e.target.value);
//   const handleSurname = (e) => setSurname(e.target.value);
//   const handleAddress = (e) => setAddress(e.target.value);
//   const handlephoneNumber = (e) => setphoneNumber(e.target.value);

//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     if (name === '' || surname === '' || email === '' || password === '' || address === '' || phoneNumber === '') {
//       setErrorMessage('All fields are required');
//       return;
//     } else {
//       const requestBody = { name, surname, email, password, address, phoneNumber };
//       authService
//         .signup(requestBody)
//         .then((response) => {
//           navigate("/login");
//         })
//         .catch((error) => {
//           console.log(error)
//           const errorDescription = error.response.data.message;
//           setErrorMessage(errorDescription);
//         });
//     }
//   };

//   return (
//     <div className="MainSignup">
//       <div className="SignupPage">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
//           <p className="text-gray-500 text-sm">Join Restauranty and start managing your menu</p>
//         </div>

//         <form onSubmit={handleSignupSubmit}>
//           <div className="inputwrap">
//             <div className="grid grid-cols-2 gap-3 mt-2 mb-3">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
//                   <FaCircleUser className="w-[1rem] h-[1rem] text-gray-400" />
//                 </div>
//                 <input className="input-forms" type="text" name="name" placeholder="First Name" value={name} onChange={handleName} />
//               </div>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
//                   <FaRegCircleUser className="w-[1rem] h-[1rem] text-gray-400" />
//                 </div>
//                 <input className="input-forms" type="text" name="surname" placeholder="Last Name" value={surname} onChange={handleSurname} />
//               </div>
//             </div>
//             <div className="relative mb-3">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
//                 <MdEmail className="w-[1.1rem] h-[1.1rem] text-gray-400" />
//               </div>
//               <input className="input-forms" type="email" name="email" placeholder="Email address" value={email} onChange={handleEmail} />
//             </div>
//             <div className="relative mb-3">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
//                 <FaLocationDot className="w-[1rem] h-[1rem] text-gray-400" />
//               </div>
//               <input className="input-forms" type="text" name="address" placeholder="Address" value={address} onChange={handleAddress} />
//             </div>
//             <div className="relative mb-3">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
//                 <FaPhoneFlip className="w-[1rem] h-[1rem] text-gray-400" />
//               </div>
//               <input className="input-forms" type="text" name="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={handlephoneNumber} />
//             </div>
//             <div className="relative mb-2">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
//                 <FaLock className="w-[1rem] h-[1rem] text-gray-400" />
//               </div>
//               <input
//                 className="input-forms"
//                 placeholder="Password"
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={handlePassword}
//               />
//             </div>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <button className="button w-full" type="submit">Create Account</button>

//             <p className="text-gray-500 text-sm mt-2">Already have an account?</p>
//             <Link to={"/login"}><p className="sign-up-link text-sm mt-1">Sign in</p></Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignupPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { MdEmail } from "react-icons/md";
import { FaLock, FaCircleUser, FaRegCircleUser, FaLocationDot, FaPhoneFlip } from "react-icons/fa6";

function SignupPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handlephoneNumber = (e) => setphoneNumber(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (name === "" || surname === "" || email === "" || password === "" || address === "" || phoneNumber === "") {
      setErrorMessage("All fields are required");
      return;
    } else {
      const requestBody = { name, surname, email, password, address, phoneNumber };
      authService
        .signup(requestBody)
        .then(() => navigate("/login"))
        .catch((error) => {
          console.log(error);
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#111110] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">

        {/* Card */}
        <div className="relative bg-[#1C1C19] border border-white/[0.06] rounded-3xl px-9 py-10 overflow-hidden">

          {/* Warm glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-48 bg-orange-500 opacity-10 blur-3xl pointer-events-none rounded-full" />

          {/* Brand header */}
          <div className="text-center mb-7 relative z-10">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30 mb-2">
              Restaurant OS
            </p>
            <h1
              className="text-3xl text-white mb-1"
              style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
            >
              Restauranty
            </h1>
            <p className="text-white/30 text-sm font-light">
              Create your account to get started
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/[0.07] mb-7" />

          {/* Form */}
          <form onSubmit={handleSignupSubmit} className="relative z-10 space-y-3">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <FaCircleUser className="w-3.5 h-3.5 text-white/30" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="First name"
                  value={name}
                  onChange={handleName}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-10 pr-3 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all duration-200"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <FaRegCircleUser className="w-3.5 h-3.5 text-white/30" />
                </div>
                <input
                  type="text"
                  name="surname"
                  placeholder="Last name"
                  value={surname}
                  onChange={handleSurname}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-10 pr-3 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <MdEmail className="w-4 h-4 text-white/30" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={handleEmail}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all duration-200"
              />
            </div>

            {/* Address */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaLocationDot className="w-3.5 h-3.5 text-white/30" />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={address}
                onChange={handleAddress}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all duration-200"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaPhoneFlip className="w-3.5 h-3.5 text-white/30" />
              </div>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={handlephoneNumber}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaLock className="w-3.5 h-3.5 text-white/30" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all duration-200"
              />
            </div>

            {/* Error */}
            {errorMessage && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                {errorMessage}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-medium text-sm py-3.5 rounded-xl transition-all duration-200 mt-1"
            >
              Create Account
            </button>

          </form>

          {/* Login link */}
          <div className="text-center mt-5 relative z-10">
            <p className="text-white/25 text-xs">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-400 hover:text-orange-300 transition-colors duration-150"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/20 text-xs">System online · Running on AKS</span>
        </div>

      </div>
    </div>
  );
}

export default SignupPage;