import { withAuth } from '@clerk/nextjs';

const ProtectedPage = () => {
    return <h1>This is a protected page!</h1>;
};

export default withAuth(ProtectedPage); 