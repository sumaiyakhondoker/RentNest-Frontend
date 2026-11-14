import { Loader } from 'lucide-react';

const Loading = () => {
    return (
        <div className='w-full min-h-screen flex justify-center items-center text-primary'>
           <Loader size={55} className="animate-spin" aria-hidden="true" />
        </div>
    );
};

export default Loading;
