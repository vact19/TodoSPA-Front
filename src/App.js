import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import {
  Paper, List, Container, Grid, Button, AppBar,
  Toolbar, Typography
} from "@material-ui/core";
import './App.css';
import { call, signout } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],// 1. item->items 배열로
      /* UI 글리치를 해결하기 위해 로딩 중이라는 상태를 표현할 변수
        생성자에 상태 변수를 추가한다.*/
      loading: true,
    };
  }
  // // 1. 함수 추가
  // add = (item) => {
  //   const thisItems = this.state.items; // 배열 items에 접근
  //   item.id = "ID-" + thisItems.length; // key를 위한 id 추가
  //   console.log("thisItems.length" + thisItems.length);
  //   item.done = false; // done 초기화
  //   thisItems.push(item); // 리스트에 아이템 추가
  //   this.setState({ items: thisItems }); // 업데이트는 반드시 this.setState로 해야.
  //   console.log("items : ", this.state.items);
  // }
  // // 버튼 클릭 시 실행될 delete()함수 작성. 전체 Todo 리스트는 App.js에서 관리
  // // 하기 때문에 delete() 함수는 App.js에 작성해야 한다. 이후 Todo 컴포넌트에 함수를 넘김
  // delete = (item) => {
  //   const thisItems = this.state.items;
  //   console.log("Befor Update Items : ", this.state.items);
  //   // 인자로 넘어온 item을 제외하기 위해 filter()를 사용하여,
  //   // item과 id가 같은 경우 제외한다.
  //   // 해당 인자인 item만 필터로 지운 다음 전체를 다시 그리는 듯?
  //   const newItems = thisItems.filter(e => e.id !== item.id);
  //   this.setState({ items: newItems }, () => {
  //     // 디버깅 콜백
  //     console.log("Update Items : ", this.state.items)
  //   });
  // }
  componentDidMount() { // 첫 렌더링 후 실행되는 함수
    /* componentDidMount에서 Todo 리스트를 가져오는 Get 요청이 성공적으로
    리턴하는 경우 loading을 false로 고친다. 더 이상 로딩 중이 아니기 때문, */
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  update = (item) => { // call을 누르면 데이터를 쏴서 백엔드에 적용시키고, 
    //Promise Resolved면 then절에 가서 나머지 할 일을 마무리한다.
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };


  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id}
              delete={this.delete} update={this.update}
            />
          ))}
        </List>
      </Paper>
    );
    //navigationBar 추가
    var navigationBar = (
      <AppBar position='static'>
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
    /*로딩 중이 아닐 때 렌더링할 부분 */
    var todoListPage = (
      // AddTodo 컴포넌트에서 add()함수를 props로 넘겨받아 onButtonClick에서 사용
      <div>
        {navigationBar} {/*내비게이션 바 렌더링*/}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );
    /*로딩 중일 때 렌더링할 부분 */
    var loadingPage = <h1>로딩중...</h1>;
    var content = loadingPage;
    if (!this.state.loading) {
      /* 로딩 중이 아니면 todoListPage를 선택*/
      content = todoListPage;
    }
    /* 조건문 거쳐서 선택한 content를 렌더링*/
    return <div className='App'>{content}</div>;
  }
}





export default App;
