const decoder = require("base64-arraybuffer");
const supabaseClient = require("./supaClient");


// Book management service
async function fetchBooksData(req, res) {
    try {
        const { data, error } = await supabaseClient.rpc('get_books_data');

        if (error) {
            console.log("error");
            res.status(505).json({ error: 'Failed to fetch books' });
        } else {
            console.log("fetching");
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

async function fetchStudentBooksOnLoanData(req, res) {
    console.log("fetching")
    const { id_of_student } = req.body; 
    try {
        const { data, error } = await supabaseClient.rpc('get_student_books_on_loan', { id_of_student: id_of_student });

        if (error) {
            console.log(error);
            res.status(505).json({ error: 'Failed to fetch books' });
        } else {
            console.log(data);
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
            decoder.decode(image_base64),
            {
                contentType: `image/${image_extension}`
            }
        ); 
                
        if (bucketError) {
            console.log("Bucket\n" + bucketError);
            return res.status(505).json({ error: 'Failed to upload image' })
        }             

        const { data: urlData,  error: image_url_error} = supabaseClient.storage.from('books_images').getPublicUrl(`${title}.${image_extension}`);

        if(image_url_error) {
            console.log("Url\n" + image_url_error);
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
        return res.status(505).json({ error: 'Internal error' });
    }
}


async function addBookToLoan(req, res) {
    const {borrower_id, book_id, devolution_date, student_borrower} = req.body;

    try {

        const { id_exists } = await supabaseClient.rpc('check_if_student_id_exists', { user_student_id: borrower_id })

        if (id_exists) {
            const { data, error } = await supabaseClient.rpc('add_loan', { 
                book_id: book_id, devolution_date: devolution_date, student_borrower: student_borrower
            })

            if (error) {
                res.status(505).json({ error: "Error adding book to loan" });
            } else {
                if(data) { 
                    res.status(201).json({ success: "Book added succesfully" }); 
                } else {
                    res.status(404).json({ success: "User not found" }); 
                } 
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
async function deleteBook(req, res) {
    const { isbn } = req.body;

    try {
        const {error} = await supabaseClient.rpc('delete_book', { isbn_of_book: isbn });

        if(error) {
            res.status(505).json({error: 'Can\'t delete the book selected'});
        } else {
            res.status(201).json({ success: 'Book succesfully deleted' });
        }
    } catch(onDeleteError){
        res.status(505).json({ error: 'Internal error' });
    }
}

async function deleteBookCopy(req, res){
    const {id} = req.body;
    try {
        const { data, error } = await supabaseClient.rpc('delete_book_copy', { id_of_book_copy: id });
        if(error) {
            console.log(error);
            res.status(505).json({ error: 'Can\'t delete book copy' });
        } else {
            console.log(data);
            res.status(201).json({ success: 'Copy succesfully deleted' });
        }
    } catch(onDeleteCopyError) {
        console.log(onDeleteCopyError);
        res.status(505).json({ error: 'Internal error' });
    }
}

module.exports = { fetchBooksData, fetchBooksOnLoanData, fetchStudentBooksOnLoanData, fetchStudentsData, addBook, addBookToLoan, returnToInventory, deleteBook, deleteBookCopy };
