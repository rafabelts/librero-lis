const decode = require("base64-arraybuffer");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();
const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_KEY;
const supabaseClient = createClient(supabase_url, supabase_key);



// Book management service

async function fetchBooksData(req, res) {
    try {
        const { data, error } = await supabaseClient.rpc('get_books_data');

        if (error) {
            console.log("error");
            res.status(505).json({ error: 'Failed to fetch books' });
        } else {
            res.status(201).send(data);
        }
    
    } catch(e){
        res.status(500).json({ error: 'Internal error' });
    }
}

async function fetchBooksOnLoanData(req, res) {
    try {
        const { data, error } = await supabaseClient.rpc('get_books_on_loan');

        if (error) {
            console.log("error");
            res.status(505).json({ error: 'Failed to fetch books' });
        } else {
            res.status(201).send(data);
        }
    
    } catch(e){
        res.status(500).json({ error: 'Internal error' });
    }
}

async function fetchStudentsData(req, res) {
    try {
        const { data, error } = await supabaseClient.rpc('get_students_data');

        if (error) {
            res.status(505).json({ error: 'Failed to fetch students' });
        } else {
            res.status(201).send(data);
        }
    
    } catch(e){
        res.status(500).json({ error: 'Internal error' });
    }
}

async function addBook(req, res) {
    const { isbn, title, editorial, publication_year, copies, author, image_extension, image_base64 } = req.body;
    
        
    try {
       const {  error: bucketError } = await supabaseClient.storage.from('books_images').upload(
            `${title}.${image_extension}`,
            decode(image_base64),
            {
                contentType: `image/${image_extension}`
            }
        ); 
                
        if (bucketError) {
            res.status(505).json({ error: 'Failed to upload image' })
        }
        
        const { data: urlData,  error: image_url_error} = supabaseClient.storage.from('books_images').getPublicUrl(`${title}.${image_extension}`);
        
        if(image_url_error) {
            return res.status(505).json({ error: 'Failed to get image URL' });
        }
        
        const image_url = urlData.publicUrl;
        const { error } = await supabaseClient.rpc('add_new_book', { book_isbn: isbn, book_title: title, book_editorial: editorial, book_publication_year: publication_year, book_copies: copies, author: author, image_url: image_url });

        if (error) {
            console.log("error");
            res.status(505).json({ error: 'Failed to add new book' });
        } else {
            res.status(201).json({ success: 'Book added succesfully' });
        }           


       
    } catch(errorOnAdd) {
        console.log(errorOnAdd);
        res.status(505).json({ error: 'Internal error' });
    }
}


async function addBookToLoan(req, res) {
    const {borrower_id, book_id, devolution_date, student_borrower} = req.body;

    try {

        const { id_exists } = await supabaseClient.rpc('check_if_student_id_exists', { user_student_id: borrower_id })

        if (id_exists) {
            const { error } = await supabaseClient.rpc('add_loan', { 
                book_id: book_id, devolution_date: devolution_date, student_borrower: student_borrower
            })

            if (error) {
                res.status(505).json({ error: "Error adding book to loan" });
            } else {
                res.status(201).json({ success: "Book added succesfully" });
            }
        } else {
            res.status(404).json({error: "Didn't find borrower id"})
        }

    } catch(error){
        res.status(505).json({ error: "Internal error" });
    }
}

async function returnToInventory(req, res){
    const { book_id } = req.body;
    
    try {
        const { data: isOnLoan, error } = await supabaseClient.rpc('return_book_to_inventory', { book_id: book_id } );

        if(error) {
            res.status(505).json({ error: 'Error adding back to inventory' });
        } 

        if (isOnLoan) {
            res.status(201).json({ success: 'Book returned succesfully' })
        } else {
            res.status(505).json({ error: 'Book doesnt on loan' });
        }

    } catch(onReturnError){
        res.status(505).json({ error: 'Internal error' }); 
    }
} 

module.exports = { fetchBooksData, fetchBooksOnLoanData, fetchStudentsData, addBook, addBookToLoan, returnToInventory };
