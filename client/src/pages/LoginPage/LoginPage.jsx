// import { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth.context";
// import authService from "../../services/auth.service";
// import { MdEmail } from "react-icons/md"
// import { FaLock } from "react-icons/fa6"

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(undefined);

//   const { storeToken, authenticateUser } = useContext(AuthContext);

//   const handleEmail = (e) => setEmail(e.target.value);
//   const handlePassword = (e) => setPassword(e.target.value);

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     const requestBody = { email, password };

//     authService
//       .login(requestBody)
//       .then((response) => {
//         storeToken(response.data.authToken);
//         authenticateUser();
//       })
//       .catch((error) => {
//         const errorDescription = error.response.data.message;
//         setErrorMessage(errorDescription);
//       });
//   };

//   return (
//     <div className="mainlogin">
//       <div className="LoginPage">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//           <p className="text-gray-500 text-sm">Sign in to manage your restaurant</p>
//         </div>

//         <form id="form" onSubmit={handleLoginSubmit}>
//           <div className="inputwrap">
//             <div className="relative mt-2 mb-4">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
//                 <MdEmail className="w-[1.1rem] h-[1.1rem] text-gray-400" />
//               </div>
//               <input className="input-forms" type="email" name="email" placeholder="Email address" value={email} onChange={handleEmail} />
//             </div>
//             <div className="relative mb-2">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
//                 <FaLock className="w-[1rem] h-[1rem] text-gray-400" />
//               </div>
//               <input
//                 className="input-forms"
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={handlePassword}
//               />
//             </div>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <button className="button w-full" type="submit">Sign In</button>
//             <p className="text-gray-500 text-sm mt-2">Don't have an account yet?</p>
//             <Link to={"/signup"}><p className="sign-up-link text-sm mt-1">Create an account</p></Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="min-h-screen bg-[#111110] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">

        {/* Card */}
        <div className="relative bg-[#1C1C19] border border-white/[0.06] rounded-3xl px-9 py-11 overflow-hidden">

          {/* Warm glow top */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-48 bg-orange-500 opacity-10 blur-3xl pointer-events-none rounded-full" />

          {/* Emblem */}
          <div className="flex justify-center mb-7 relative z-10">
            <div className="w-24 h-24 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center relative">
              <div className="absolute inset-2 rounded-full border border-white/[0.06]" />
              {/* Replace the img src with your actual logo path */}
              <img
                src="/logo.png"
                alt="Restauranty"
                className="w-14 h-14 object-contain relative z-10"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <span className="text-4xl hidden items-center justify-center">🍴</span>
            </div>
          </div>

          {/* Brand */}
          <div className="text-center mb-8 relative z-10">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30 mb-2">
              Restaurant OS
            </p>
            <h1
              className="text-3xl text-white mb-2"
              style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
            >
              Restauranty
            </h1>
            <p className="text-white/30 text-sm font-light">
              Sign in to manage your restaurant
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/[0.07] mb-7" />

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="relative z-10 space-y-3">

            {/* Email input */}
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

            {/* Password input */}
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
              Sign In
            </button>

          </form>

          {/* Register link */}
          <div className="text-center mt-5 relative z-10">
            <p className="text-white/25 text-xs">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-400 hover:text-orange-300 transition-colors duration-150"
              >
                Create one
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

export default LoginPage;