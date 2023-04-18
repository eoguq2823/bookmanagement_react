/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { FiUser, FiLock } from 'react-icons/fi';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { BiRename } from 'react-icons/bi';
import axios from 'axios';

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 30px;
`;

const logo = css`
    margin: 50px 0px;
    font-size: 34px;
    font-weight: 900;
`;

const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 50px 20px;
    width: 400px;
`;

const authForm = css`
    width: 100%;
`;

const inputLabel = css`
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
`;


const loginButton = css`
    margin: 10px 0px;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 100%;
    height: 40px;
    background-color: white;
    font-weight: 900;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eee;
    }
`;

const signupMessage = css`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #777;
`;

const register = css`
    margin-top: 10px;
    font-weight: 600;
`;

const Register = () => {
    const [registerUser, setRegusterUser] = useState({email: "", password: "", name: ""})

    // 이걸로 Input 3개를 처리하기 때문에 name속성값을 받아줘야함
    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setRegusterUser({...registerUser, [name]: value})
    }
    //버튼
    const registeSubmit = () => {
        const data = {
            ...registerUser
        }
        const option = {
            headers: {
                // JSON타입으로 요청을 보내줌
                "Content-Type": "application/json"
            }
        }
        axios
        .post("http://localhost:8080/auth/signup", JSON.stringify(data), option)
        .then(response => {
            console.log("성공")
            console.log(response)
        })
        .catch(error => {
            console.log("실패")
            console.log(error.response.data.errorData)
        })
        
        // 웹은 싱글스레드이기 때문에 비동기가 매우 중요하다. -> 맞겨놓고 딴짓해도 됨
        // 동기 설정을 하려면 좀 복작함.
        // 위에꺼랑 따로 놈 순서를 지키면서 함수에 넣어줘야함.

        console.log("비동기 테스트")
    }

    return (
        <div css={container}>

            <header>
                <h1 css={logo}>SIGN UP</h1>
            </header>

            <main css={mainContainer}>
                <div css={authForm}>
                    <label css={inputLabel}>Email</label>
                    <LoginInput type="email" placeholder="Type your email" onChange={onChangeHandle} name="email">
                        <FiUser />
                    </LoginInput>  
                    <label css={inputLabel}>Password</label>
                    <LoginInput type="password" placeholder="Type your password" onChange={onChangeHandle} name="password">
                        <FiLock />
                    </LoginInput>
                    <label css={inputLabel}>Name</label>
                    <LoginInput type="text" placeholder="Type your name" onChange={onChangeHandle} name="name">
                        <BiRename />
                    </LoginInput>
                    
                    <button css={loginButton} onClick={registeSubmit}>REGISTER</button>                      
                </div>
            </main>

            <div css={signupMessage}>Already a user?</div>

            <footer>
                <div css={register}><Link to="/login">SING UP</Link></div>
            </footer>

        </div>
    );
};

export default Register;