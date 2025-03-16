const AuthLayout = ({
    children
}: {
    // Auth asking user to login shit.
    children: React.ReactNode
}) => {
    return ( 
        <div className="h-full flex items-center justify-center">
            {children}

        </div>
     );
}
 
export default AuthLayout;