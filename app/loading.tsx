import { Loader } from 'lucide-react';

const Loading = () => {
    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
           <Loader size={55}/>
        </div>
    );
};

export default Loading;