import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import "./Login.style.css";
import {useUser} from "../../hooks/useUser";
import {useNavigate} from "react-router-dom";

const Login = ({setAuth}) => {
    const [studentId, setStudentId] = useState("");
    const [passwd, setPasswd] = useState("");
    const studentIdRef = useRef(null);
    const passwdRef = useRef(null);
    const navigate = useNavigate();
    const user = useUser();
    let str = "";

    // console.log(user[0]?.number);
    const handleSubmit = (event) => {
        event.preventDefault();
        if(studentId === "") {
            alert("학번을 입력해주세요.");
            studentIdRef.current.focus();
            return;
        }
        if(passwd === "") {
            alert("비밀번호를 입력해주세요.");
            passwdRef.current.focus();
            return;
        }
        // console.log(user)
        // console.log(user.length);
        let check = false;
        for(let i = 0; i < user.length; i++){
            if(user[i].number != studentId || user[i].passwd != passwd){
                check = false;
            }else{
                check = true;
                str = user[i].id
                break;
            }
        }
        // console.log(passwd);
        // console.log(studentId);
        // console.log(check);
        if(check){
            alert("로그인 성공!");
            if(str === "student") {setAuth(1);} //학생 계정
            else if(str === "admin") {setAuth(2)} // 식당 관리자 계정
            navigate("/");
        }else{
            alert("학번 또는 비밀번호가 맞지 않습니다!!");
        }
    };

    return (
        <Container className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>학번</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="학번을 입력하세요"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        ref={studentIdRef}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호"
                        value={passwd}
                        onChange={(e) => setPasswd(e.target.value)}
                        ref={passwdRef}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    확인
                </Button>
                <p/>
                <Button variant="primary" type="button" onClick={()=>navigate('/')}>
                    홈으로
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
