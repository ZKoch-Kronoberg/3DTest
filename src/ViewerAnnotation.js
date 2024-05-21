import { float } from "three/examples/jsm/nodes/Nodes.js";

function ViewerAnnotation({ id, show, annotation }){
    return(
        <div id={id} 
            className={`absolute size-40 aspect-square text-white bg-sky-600 bg-opacity-[.33] p-1 rounded-tr-[25%] rounded-bl-[25%] rounded-br-[25%] backdrop-blur overflow-auto scrollbar-hide
            ${show ? 'block' : 'hidden'}`}>
            <div className="mx-3">
                <p className='text-lg font-bold break-words'>{annotation.title}</p>
                <p className="">{annotation.text}</p>
            </div>
      </div>
    )
    
}

export default ViewerAnnotation;