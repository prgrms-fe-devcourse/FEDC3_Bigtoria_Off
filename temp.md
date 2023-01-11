<인증>
로그인 POST - /login
로그아웃 POST - /logout
회원가입 POST - /signup
인증 확인 GET - /auth-user

<사용자>
사용자 목록 GET - /users/get-users
현재 접속 중인 사용자 목록 GET - /users/online-users
사용자 정보 GET - /users/{userId}
프로필 이미지 변경 POST - /users/upload-photo
커버 이미지 변경 POST - /users/upload-photo

<설정>
내 정보 변경 PUT - /settings/update-user
비밀번호 변경 PUT - /settings/update-password

<채널>
채널 목록 GET - /channels
채널 정보 GET - /channel/{channelName} *channelName 한글 인코딩 필요

<포스트>
특정 채널의 포스트 목록 GET - /posts/channel/{channelId}
특정 사용자의 포스트 목록 GET - /posts/author/{authorId}
특정 채널에 포스트 작성하기 POST - /posts/create
특정 포스트 상세 보기 GET - /posts/{postId}
내가 작성한 포스트 수정하기 PUT - /posts/update
내가 작성한 포스트 삭제하기 DELETE - /posts/delete

<좋아요>
특정 포스트 좋아요 POST - /likes/create
특정 포스트 좋아요 취소 DELETE - /likes/delete

<댓글>
특정 포스트에 댓글 달기 POST - /comments/create
특정 포스트에 작성한 내 댓글 지우기 DELETE - /comments/delete

<알림>
나의 알림 목록 GET - /notifications
알림 확인 처리 PUT - /notifications/seen
알림 생성 POST - notifications/create

<팔로우>
특정 유저 팔로우 POST - /follow/create
특정 유저 언팔 DELETE - /follow/delete

<메시지>
나의 메시지함 (소통한 유저 목록) GET - /messages/conversations
특정 사용자와 소통한 메시지 목록 GET - /messages
특정 사용자에게 메시지 전송 POST - /messages/create
메시지 확인 처리 PUT - /messages/update-seen

<검색>
사용자 검색 GET - /search/users/{query}
전체 검색 GET - /search/all/{query}