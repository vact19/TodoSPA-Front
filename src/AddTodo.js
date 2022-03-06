import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { title: "" } };
        this.add = props.add; // props의 함수를 this.add에 연결
    }
    // (1) 함수 작성 후 TextField onChange에 연결하고, value에 영향을 주는 함수
    onInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        //thisItem을 만들어 title 안에 값을 넣고 setState로 값을 바꿈
        this.setState({ item: thisItem });
        console.log(thisItem);
    }
    // 1. 함수 작성 후 Button onClick에 연결
    onButtonClick = () => {
        this.add(this.state.item); // add 함수 사용
        this.setState({ item: { title: "" } });
    }
    enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
            this.onButtonClick();
        }
    }
    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{ paddingRight: 17 }}>
                        <TextField
                            placeholder="Add Todo here"
                            fullWidth
                            onChange={this.onInputChange}
                            onKeyPress={this.enterKeyEventHandler}
                            value={this.state.item.thisItem}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={this.onButtonClick}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
export default AddTodo;