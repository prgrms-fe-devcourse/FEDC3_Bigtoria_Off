<div align="center">
  <img src="https://user-images.githubusercontent.com/77133565/213366004-458a84a3-8e36-4ac6-81a5-0ad36944bd83.png" />
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/383b598e-c07f-427a-84f3-f052918e8974/deploy-status)](https://app.netlify.com/sites/sensational-concha-6acb55/deploys)

<br />
<br />

# 프로젝트 소개

자신의 일대기를 기록하고 다른 사람들과 공유할 수 있는 커뮤니티 사이트입니다.

<br />

💡 [ Problem & Solution ]

`문제`

- SNS의 기능을 갖추고 있으면서 나의 인생 스토리를 시간 흐름에 맞게 기록할 수 있는 플랫폼이 있었으면 좋겠다.

`해결`

- 타임라인을 도입해서 연도별로 사용자의 기록을 관리할 수 있게 한다.
  SNS기능을 통해 다른 사람의 프로필과 게시글들을 살펴볼 수 있게 한다.

<br />
<br />

# Members

<table>
  <tbody>
  <tr>
  <td align="center">팀장</td>
  <td align="center">팀원</td>
  <td align="center">팀원</td>
  <td align="center">팀원</td>
  <td align="center">팀원</td>
  </tr>
  <tr>
  <td align="center"><a href="https://github.com/kmww"><img src="https://avatars.githubusercontent.com/u/105067764?v=4" width="150px;" style="max-width: 100%;"/></a></td>
  <td align="center"><a href="https://github.com/Kal-MH"><img src="https://avatars.githubusercontent.com/u/59648372?v=4" width="150px;" style="max-width: 100%;"/></a></td>
  <td align="center"><a href="https://github.com/glassk"><img src="https://avatars.githubusercontent.com/u/63575891?v=4" width="150px;" style="max-width: 100%;"/></a></td>
  <td align="center"><a href="https://github.com/tooooo1"><img src="https://avatars.githubusercontent.com/u/77133565?v=4" width="150px;" style="max-width: 100%;"/></a></td>
  <td align="center"><a href="https://github.com/metacode22"><img src="https://avatars.githubusercontent.com/u/93233930?v=4" width="150px;" style="max-width: 100%;"/></a></td>
  </tr>
  <tr>
  <td align="center"><a href="https://github.com/kmww">김민우</a></td>
  <td align="center"><a href="https://github.com/Kal-MH">갈미현</a></td>
  <td align="center"><a href="https://github.com/glassk">김유리</a></td>
  <td align="center"><a href="https://github.com/tooooo1">정충일</a></td>
  <td align="center"><a href="https://github.com/metacode22">신승준</a></td>
  </tr>
  </tbody>
</table>

<br />
<br />

# 개발 일정

2023.01.09. ~ 2023.01.20.

<br />

# Tech Stack

## 💪 언어 & 라이브러리

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="react">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="typescript">
<img src="https://img.shields.io/badge/emotion-DB7093?style=for-the-badge&logo=emotion&logoColor=white" alt="emotion">
<img src="https://img.shields.io/badge/swr-FFFFFF?style=for-the-badge&logo=swr&logoColor=white" alt="swr">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="axios">

<br />

## 🔧 도구

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="git">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" alt="github">
<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" alt="prettier">
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="eslint">
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" alt="slack">
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white" alt="notion">

<br />
<br />

# 폴더 구조

```
📦src
 ┣ 📂apis
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜follow.ts
 ┃ ┣ 📜getFollowUser.ts
 ┃ ┣ 📜instance.ts
 ┃ ┣ 📜notification.ts
 ┃ ┣ 📜search.ts
 ┃ ┣ 📜signup.ts
 ┃ ┣ 📜story.ts
 ┃ ┣ 📜userInfo.ts
 ┃ ┗ 📜userList.ts
 ┣ 📂assets
 ┃ ┗ 📂images
 ┃ ┃ ┗ 📜defaultImage.png
 ┣ 📂components
 ┃ ┣ 📂Follow
 ┃ ┃ ┣ 📜FollowEmpty.tsx
 ┃ ┃ ┣ 📜FollowModal.tsx
 ┃ ┃ ┣ 📜FollowerButton.tsx
 ┃ ┃ ┣ 📜FollowingButton.tsx
 ┃ ┃ ┗ 📜FollowingList.tsx
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜NoResultBox.tsx
 ┃ ┃ ┣ 📜SearchForm.tsx
 ┃ ┃ ┣ 📜UserList.tsx
 ┃ ┃ ┗ 📜UserProfile.tsx
 ┃ ┣ 📂Message
 ┃ ┃ ┣ 📜MessageBubble.tsx
 ┃ ┃ ┗ 📜MessageInputForm.tsx
 ┃ ┣ 📂Notification
 ┃ ┃ ┣ 📜NotificationButton.tsx
 ┃ ┃ ┣ 📜NotificationList.tsx
 ┃ ┃ ┣ 📜NotificationMsg.tsx
 ┃ ┃ ┣ 📜TabContainer.tsx
 ┃ ┃ ┗ 📜TabItem.tsx
 ┃ ┣ 📂Profile
 ┃ ┃ ┣ 📜ImageForm.tsx
 ┃ ┃ ┣ 📜PasswordForm.tsx
 ┃ ┃ ┣ 📜ProfileModal.tsx
 ┃ ┃ ┗ 📜TextForm.tsx
 ┃ ┣ 📂SignIn
 ┃ ┃ ┣ 📜SignInForm.tsx
 ┃ ┃ ┗ 📜SignInLinks.tsx
 ┃ ┣ 📂SignUp
 ┃ ┃ ┣ 📜SignUpButton.tsx
 ┃ ┃ ┣ 📜SignUpInput.tsx
 ┃ ┃ ┗ 📜SignUpSelector.tsx
 ┃ ┣ 📂Story
 ┃ ┃ ┣ 📜CommentForm.tsx
 ┃ ┃ ┣ 📜CommentList.tsx
 ┃ ┃ ┣ 📜LikeButton.tsx
 ┃ ┃ ┣ 📜StoryComment.tsx
 ┃ ┃ ┗ 📜StoryInfo.tsx
 ┃ ┣ 📂StoryBook
 ┃ ┃ ┣ 📜Empty.tsx
 ┃ ┃ ┣ 📜FollowButton.tsx
 ┃ ┃ ┣ 📜Loading.tsx
 ┃ ┃ ┣ 📜StoriesByYear.tsx
 ┃ ┃ ┣ 📜StoryAddButton.tsx
 ┃ ┃ ┣ 📜StoryBookTitle.tsx
 ┃ ┃ ┗ 📜StoryCard.tsx
 ┃ ┣ 📂StoryEdit
 ┃ ┃ ┣ 📜DatePicker.tsx
 ┃ ┃ ┣ 📜ImageInput.tsx
 ┃ ┃ ┣ 📜ImageUpload.tsx
 ┃ ┃ ┣ 📜StoryEditForm.tsx
 ┃ ┃ ┣ 📜SubmitButton.tsx
 ┃ ┃ ┗ 📜TextInput.tsx
 ┃ ┗ 📂shared
 ┃ ┃ ┣ 📜DarkModeSwitch.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜ScrollToTop.tsx
 ┃ ┃ ┗ 📜SignInButton.tsx
 ┣ 📂constants
 ┃ ┣ 📜apiParams.ts
 ┃ ┣ 📜apiUrls.ts
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜colors.ts
 ┃ ┣ 📜errorMessages.ts
 ┃ ┣ 📜http.ts
 ┃ ┗ 📜routes.ts
 ┣ 📂contexts
 ┃ ┣ 📜DisplayModeContext.tsx
 ┃ ┗ 📜NotificationContext.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useCheckAuthToken.ts
 ┃ ┣ 📜useComment.ts
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useFetchStories.ts
 ┃ ┣ 📜useFetchUser.ts
 ┃ ┣ 📜useGetFollow.ts
 ┃ ┣ 📜useGetFollower.ts
 ┃ ┣ 📜useInfiniteScroll.ts
 ┃ ┣ 📜useIntersectionObserver.ts
 ┃ ┣ 📜useIsOverByScroll.ts
 ┃ ┣ 📜useLazyLoadImage.ts
 ┃ ┣ 📜useLike.ts
 ┃ ┣ 📜useSearchForm.ts
 ┃ ┣ 📜useSignInForm.ts
 ┃ ┣ 📜useSignUpForm.ts
 ┃ ┣ 📜useStory.ts
 ┃ ┗ 📜useTimeoutFn.ts
 ┣ 📂interfaces
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜displayMode.ts
 ┃ ┣ 📜followList.ts
 ┃ ┣ 📜like.ts
 ┃ ┣ 📜message.ts
 ┃ ┣ 📜notification.ts
 ┃ ┣ 📜signUp.ts
 ┃ ┣ 📜story.ts
 ┃ ┗ 📜user.ts
 ┣ 📂pages
 ┃ ┣ 📜404.tsx
 ┃ ┣ 📜Chat.tsx
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜Notification.tsx
 ┃ ┣ 📜Profile.tsx
 ┃ ┣ 📜SignIn.tsx
 ┃ ┣ 📜SignUp.tsx
 ┃ ┣ 📜Story.tsx
 ┃ ┣ 📜StoryBook.tsx
 ┃ ┣ 📜StoryEdit.tsx
 ┃ ┗ 📜follow.tsx
 ┣ 📂styles
 ┃ ┗ 📜GlobalStyle.tsx
 ┣ 📂utils
 ┃ ┣ 📜calcCreatedToCurrentTime.ts
 ┃ ┣ 📜getChangedIndex.ts
 ┃ ┣ 📜getF4FId.ts
 ┃ ┣ 📜helpers.ts
 ┃ ┣ 📜setUserListImageFirst.ts
 ┃ ┣ 📜signUpIsValid.ts
 ┃ ┣ 📜signUpValidate.ts
 ┃ ┣ 📜storage.ts
 ┃ ┣ 📜validationSearchForm.ts
 ┃ ┗ 📜validations.ts
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```
