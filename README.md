# candy-s

`CANDY`

## resources

ERD: https://www.erdcloud.com/d/csKaRgRcni4XsYBtJ

## ref

ERD Ref: https://www.erdcloud.com/d/wNtbZdTQkjqehzKgn

https://velog.io/@qhgus/Node-Express-TypeScript-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85

https://sjh836.tistory.com/174

https://velog.io/@cloudjun/Node-TypeScript-Express%EC%97%90%EC%84%9C-%EC%84%B8%ED%8C%85%ED%95%98%EB%8A%94-JEST

## command

`yarn build` 앱 빌드

`yarn dev` tsc-watch 모드로 실행


## dev settings

```
npm install -g sequelize-cli-typescript
sequelize model:generate --name User --attributes user_id:string,user_name:string,password:string,permission:integer
sequelize db:migrate 
```