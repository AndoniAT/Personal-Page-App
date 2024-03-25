
export default async function Style1Wrapper() {
    await new Promise( ( resolve, reject ) => {
        setTimeout(()=> {
            resolve(true);
        }, 1000);
    });
  
    return (
      <div className="text-black">
        Load style1
      </div>
    );
}