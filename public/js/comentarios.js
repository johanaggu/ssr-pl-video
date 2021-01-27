
let Comentarios =(data) =>{

    let comment = `
    <div class="comment">
        <div class="comment-left">
            <img class="comment-left_img" src="${data.img}" />
            <div class="comment-left_name">${data.first_name}</div>
        </div>
        <div class="comment-right">
          ${data.comment}
        </div>
    </div>
    `
    return comment
}

export default Comentarios