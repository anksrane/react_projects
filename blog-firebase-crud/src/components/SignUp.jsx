import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button,Input } from "./index";
import { toast } from "react-toastify";

function SignUp() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate();
    const password = watch("password");

    const onSignUp = async (data) => {
        const { name, email, password} =data;
        try {
            if(!auth){
                toast.error("Firebase Auth not initialized");
                return;
            }

            const userCred= await createUserWithEmailAndPassword(auth,email,password);
            await updateProfile(userCred.user,{
                displayName:name,
            });

            toast.success("User Created Successfully");
            console.log("User Created: ",userCred.user);
            navigate("/");
        } catch (error) {
            toast.error("Error creating user: " + error.message);
            console.log("Sign Up Error: ",error.message);
        }
    }
    
    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow bg-white">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>        

            <form onSubmit={handleSubmit(onSignUp)} className="space-y-4">
                <Input label='Full Name: ' placeholder="Enter your full name"
                    {...register("name",{
                        required:"Name is required",
                    })}></Input>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <Input label='Email: ' placeholder="Enter your email"
                    {...register("email",{
                        required:"Email is required",
                        pattern:{
                            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message:"Invalid email address",
                        },
                    })}></Input>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <Input label='Password: ' type="password" placeholder="Enter your password"
                    {...register("password",{
                        required:"Password is required",
                        minLength:{
                            value:8,
                            message:"Password must be at least 8 characters",
                        },
                    })}></Input>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <Input label='Confirm Password: ' type="password" placeholder="Confirm your password"
                    {...register("confirmPassword",{
                        required:"Confirm Password is required",
                        validate:(value)=>{
                            if(value !== password){
                                return "Passwords do not match";
                            }
                        },
                    })}></Input>
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                <Button type='submit' className='w-full' 
                    disabled={isSubmitting}>{isSubmitting? "Signing Up...." : "Sign Up"}</Button>               
            </form>
            <Link className="block w-fit mt-2 ms-auto font-bold text-blue-600 hover:underline" to="/login">Login Account</Link>
        </div>
    )
}

export default SignUp
