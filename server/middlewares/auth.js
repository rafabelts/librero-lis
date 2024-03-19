import { supabase } from "../server.js";

async function handleSignUp (req, res) {
    const { student_id, email, password, name, user_type } = req.body;  
    try{    
        const {data} = await supabase.auth.signUp({ 
            email: email,
            password: password,
            options: {
                data: {
                    student_id: student_id,
                    name: name,
                    user_type: user_type,
                }
            }
        });

        const emailIsTaken = data.user && data.user.identities && data.user.identities.length === 0;
        const { data: studentIdIsTaken} = await supabase.rpc('student_id_exists', { studentid: student_id });
        
        if (emailIsTaken) {
            res.status(409).json({ message: "Email already taken" });
        } else if (studentIdIsTaken === true) {
            res.status(409).json({ message: "Student ID already taken" });
        } else {
            res.status(201).json({ message: "User created correctly" });
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e });
    }
}

async function handleLogIn (req, res) {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            res.status(401).json({ message: "Invalid credentials" });
            
        } else {
            // console.log(data.session);
            const { data } = await supabase.rpc('get_user_data', { email: email });
            res.status(201).json({ email: email, student_id: data.student_id, name: data.name });
        }

    } catch (e) {
        res.status(500).json({error: e});
    }
}


export { handleSignUp, handleLogIn };
