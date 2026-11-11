import { getMe } from "@/service/getMe";



const DashboardLayout =async ({ children }: LayoutProps<"/dashboard">) => {
    const user = await getMe()
    return (
        <div>
            {children}
        </div>
    );
};

export default DashboardLayout;