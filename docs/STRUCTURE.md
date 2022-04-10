# Service Structure

## 프로젝트

이 프로젝트는 aws s3, elasticache, rds를 사용한다.

 - 서버 어플리케이션은 사용자 요청을 처리하는 node 기반 서버로 구현한다.
 - 배치 작업용 어플리케이션은 c# 기반으로 구현한다.

### 서버 구조

서버는 마이크로서비스 아키텍쳐 구조를 기반으로 한다.

#### 커뮤니티

커뮤니티의 stateful 부분은 보통 쓰기보다 읽기가 많으므로 redis와 rdb read replica, sharding을 순으로 확장한다.

##### 게시글 CRUD

### 배치 작업용 어플리케이션