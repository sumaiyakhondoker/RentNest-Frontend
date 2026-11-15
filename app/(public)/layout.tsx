import Footer from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/service/getMe';
import { Suspense } from 'react';

const NavbarWithUser = async () => {
    const user = await getMe()
    return <Navbar user={user} />
};

const PublicLayout = ({ children }: LayoutProps<"/">) => {
    return (
        <div>
      <Suspense fallback={<div className="h-18 border-b" />}>
        <NavbarWithUser />
      </Suspense>

            <main className="flex-1">{children}</main>

            <Footer></Footer>
        </div>
    );
};

export default PublicLayout;
