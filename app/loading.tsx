import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
    return (
        <div className='w-full min-h-screen flex justify-center items-center text-primary'>
           <Spinner className="size-[55px]" />
        </div>
    );
};

export default Loading;
