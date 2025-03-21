import AuthOptions from '@/lib/AuthOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

const Layout = async ({ admin }: { admin: React.ReactNode }): Promise<React.ReactElement> => {
  const session = await getServerSession(AuthOptions);

  const renderContent = () => {
    switch (session?.user.role) {
      case 'admin':
        return admin;
      default:
        return <p>Unauthorized</p>;
    }
  };

  return <>{renderContent()}</>;
};

export default Layout;
