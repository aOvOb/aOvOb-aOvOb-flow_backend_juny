### 안녕하세요 서준희입니다.
###### 
###### node.js와 express를 이용하여 이번 과제를 수행하였습니다. 
###### dataBase는 mysql 5.7버전을 이용했습니다.
  
<br>
<br>
<br>
<br>
   
##### erd 입니다.
######    
###### ![erd](image/erd.png)
###### 
###### fw_user, fw_ext_ban, fw_ext_ban_fixed 총 3개의 테이블을 만들었습니다.  
###### 공통필드는 SYS_ID, SYS_FLAG, SYS_CREATE_DATE, SYS_MODIFY_DATE로 총 4가지 입니다.    
###### SYS_ID는 primary key로 데의터 고유 아이디입니다. UUID에서 하이픈을 지운 값을 return해주는 getNewID라는 함수를 만들어 insert될 때마다 고유 아이디를 부여하게 만들었습니다.  
###### SYS_FLAG는 논리삭제를 위한 값 입니다. SYS_FLAG가 1이면 활성, 0이면 삭제 입니다. 물리적인 삭제가 없기때문에 모든 데이터가 기록에 남아, 데이터 CRUD에 대한 로그를 따로 만들지 않기위해 구현하였습니다.
###### SYS_CREATAE_DATE는 데이터가 생성된 날짜입니다. 
###### SYS_MODIFY_DATE는 데이터가 수정된 날짜입니다.
###### FK_USER_ID는, fk_user테이블의 데이터와 관계mapping을 위해 만든 column입니다. user의 SYS_ID값이 저장되며, 추후 로그인 기능이 구현될 때 회원간의 데이터 구분이 필요하다고 생각되어 구현하였습니다.


<br>
<br>
<br>
<br>
<br>
<br>


#### 실행 방법
###### git clone 후 flow_backend_juny/server 경로에서 npm i 실행  
###### DB생성정보 
> host: 'localhost',  
  user: 'root',  
  password: '',  
  database: 'flow',  
  port: 3306
###### clone받은 폴더에 있는 flowDDL의 내용을 DB에서 실행  
###### flow_backend_juny/server 경로에서 npm start실행
###### localhost:9298 접속




<br>
<br>
<br>
<br>
<br>
<br>


#### 요건

#### 1-1 고정 확장자 구현
###### 1-2 고정확장자 checked unchecked 고민한거, 어려웠던거 등등 체크박스 데이터 어캐 가져오는지 모름 ㅠ 결국 아이디 다 다르게 만들어서 노가다함  
###### 
###### 2-1 확장자 최대 입력길이 double check한거   
###### 2-2 추가버튼 누르면 저장되는거 어떻게 표현했는지  
###### 
###### 3-1 custom extension 200개 제한건거  
###### 3-2 옆에 X 어떻게 하는지 모르겠어서 delete, 버튼 추가한거 (edit도 넣었다가 뺌)  
###### ==========================================  
######   
###### ==========================================  
###### 이 외 고민한거  
###### * 데이터 회원 묶기 (로그인 미구현)  
###### * 이름 중복체크  
###### * sql injection(처음엔 injection 유발 특수문제 replace했으나, 그냥 텍스트 박스에서부터 막아버림)  
###### * 커스텀 차단의 경우 물리삭제 없음 논리삭제만 - 나중에 사용자가 자기는 차단 안했는데 ~~~ 또는 차단 했다가 옛날에 지웠는데~~~ 등 로그를 위함  
###### * 확장자명 영어+숫자만 가능하게  
###### * docker... 올리려고 했지만,, 잘 안되서... 에러핸들링을 못해서... 걍 로컬에서 돌리는걸로...  
###### * 검색 기능도 만들었는데 만들고보니 ctrl+f로 찾으면 되서.. 뻄....  
