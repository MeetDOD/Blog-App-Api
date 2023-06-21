import mongoose from 'mongoose';

const connection = async (USER,PASS) => {

    const URL=`mongodb+srv://${USER}:${PASS}@cluster0.tsfjoaw.mongodb.net/?retryWrites=true&w=majority`;
    
    try{
        await mongoose.connect(URL);
        console.log('Success in database connection')
    }catch(er){
        console.log('failed connection',er)
    }
};

export default connection;