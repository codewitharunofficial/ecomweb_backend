import CategoryModel from '../Models/CategoryModel.js';
import slugify from 'slugify';

export const categoryController =  async (req,res) =>{

try {
    
const {name} = req.body;

if(!name) {
    res.status(400).send({
        success: false,  message: 'Category Name Is required',
    })
} 

const existingCategory = await CategoryModel.findOne({name});
if(existingCategory) {
    res.status(400).send({
        success:false,
        message: "Category Already Exists"
    })
}

const category = await new CategoryModel({name, slug: slugify(name)}).save();
res.status(200).send({
    success: true,
    message: "New Category Have Been Created Successfully",
    category
})


} catch (error) {
    console.log(error)
}

}



//updating a category

export const updateCategory = async(req, res) => {

try {

    const {name} =  req.body;
    const {id} = req.params

    const category = await CategoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new:true});
    res.status(200).send({
        success: true,
        message: 'Category Has Been Updated SuccessFully',
        category
    })
    
} catch (error) {
    console.log(error);
    res.status(401).send({
       success: false,
       message: 'Error While Updating The Category',
       error
    })
    
}

}

//getting all categories

export const getCategory = async(req, res) => {
try {
    const category = await CategoryModel.find({});
    res.status(200).send({
        success: true,
        message: "Successfully Fetched All Categories",
        category
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: true,
        message:"Error While Fetching Categories"
    })
}
}


export const deleteCategory = async (req, res) => {

    try {
           
        const {id} = req.params;

         await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message: "Category Deleted Successfully",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Deleting the Category"
        })
    }

}


//getting Signle Category

export const singleCategory =async (req, res) =>{
    try {

        const category = await CategoryModel.findOne({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message: 'Fetched Category Successfull',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting the category'
        })
    }

}