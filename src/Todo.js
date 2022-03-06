import React from "react";
import {
    ListItem, ListItemText, InputBase, Checkbox
    , ListItemSecondaryAction, IconButton
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";


// Todo 컴포넌트에 title을 매개변수로 넘김(생성자를 통해)
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true }; // 수정기능 관리를 위한 readOnly
        this.delete = props.delete;
        this.update = props.update; // update를 this.update에 할당
    }
    deleteEventHandler = () => {
        this.delete(this.state.item);
    }
    offReadOnlyMode = () => { // readOnly를 false로 변경해주는 함수(즉, 수정버튼)
        console.log("Event!", this.state.readOnly);
        this.setState({ readOnly: false }, () => {
            console.log("ReadOnly? ", this.state.readOnly)
        });
    }
    // 엔터키를 누르면 다시 읽기전용 모드로 되돌아가는 함수
    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            // setState를 이용, 생성자에서 초기값을 지정한 변수들의 
            // 값을 바꾸는 패턴이 지속적으로 사용됨
            this.setState({ readOnly: true });
            this.update(this.state.item); // 엔터를 누르면 저장
        }
    };
    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }
    // done의 true false를 바꿔주는 체크박스핸들러 함수
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done; // 변경했으니까 다음 할 일은 setState
        this.setState({ item: thisItem });
        this.update(this.state.item); // 체크박스가 변경되면 저장
        console.log("done");
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done}
                    onChange={this.checkboxEventHandler}
                />
                <ListItemText>
                    <InputBase
                        inputProps={{
                            "aria-label": "naked",
                            readOnly: this.state.readOnly
                        }}
                        onClick={this.offReadOnlyMode}
                        onChange={this.editEventHandler}
                        onKeyPress={this.enterKeyEventHandler}
                        type="text"
                        id={item.id} // 리스트 구분을 위해 id 연결. 이후 백엔드의 id로 대체됨
                        name={item.id} // 리스트 구분을 위해 id 연결
                        value={item.title}
                        multiline={true}
                        fullWidth={true}


                    />
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}
                    >
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;