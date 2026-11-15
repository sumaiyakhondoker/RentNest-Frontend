import Footer from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/service/getMe';
import { Suspense } from 'react';

const AuthLayout =async ({ children }: LayoutProps<"/auth">) => {
    const user = await getMe()
    return (
        <div>
      <Suspense fallback={<div className="h-18 border-b" />}>
        <Navbar user={user} />
      </Suspense>

            <main className="flex-1">{children}</main>

        </div>
    );
};

export default AuthLayout;