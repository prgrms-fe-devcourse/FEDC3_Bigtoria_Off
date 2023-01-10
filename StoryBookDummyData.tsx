// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const StoryBook = () => {
//   const [stories, setStories] = useState([]);
//   const [image, setImage] = useState<File>();
//   const userId = useParams();

//   const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // setImage(event.target.files)
//     // console.log(event.target.files?.[0]);
//     setImage(event.target.files?.[0]);
//   };

//   const handleClick = async () => {
//     const testTitle = JSON.stringify({
//       realTitle: '데브코스에 합류했슈',
//       year: '2022',
//       month: '10',
//       day: '14',
//     });

//     const formData = new FormData();
//     formData.append('title', testTitle);
//     image && formData.append('image', image);
//     formData.append('channelId', '63b6822ade9d2a22cc1d45c3');

//     await axios({
//       url: `${import.meta.env.VITE_API_URL}/posts/create`,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization:
//           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYmNmMGQ0ZjU5NmM2NWY5ZWUyZjIyNiIsImVtYWlsIjoiYWxvaGFqdW5lMjJAZ21haWwuY29tIn0sImlhdCI6MTY3MzMyNjgwNH0.JGg2IJjc-iBZF9Yxouln74cG3FqDXmMcUgXFjafFSyE',
//       },
//       data: formData,
//     });
//   };

//   useEffect(() => {}, []);

//   return (
//     <div>
//       <input type='file' onChange={handleUploadImage} />

//       <button onClick={handleClick}>더미 포스트 생성</button>
//     </div>
//   );
// };

// export default StoryBook;
