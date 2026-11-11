import Footer from '@/components/shared/Footer';
import { Navbar } from '@/components/shared/Navbar';
import { getMe } from '@/service/getMe';
import { Suspense } from 'react';

const PublicLayout =async ({ children }: LayoutProps<"/">) => {
    const user = await getMe()
    return (
        <div>
      <Suspense fallback={<div className="h-18 border-b" />}>
        <Navbar user={user} />
      </Suspense>

            <main className="flex-1">{children}</main>

            <Footer></Footer>
        </div>
    );
};

export default PublicLayout;