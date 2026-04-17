
export default function Container({ children, rest }) {
    return (
      <div className={` w-full mx-auto md:w-[80%] bg-[#0F172A] `} {...rest}>
        {children}
      </div>
    );
}
