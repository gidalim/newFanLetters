import { useState } from 'react';
import styled from 'styled-components'
import Button from '../../components/commons/buttons/Button'
import CommentCreator from '../../components/units/homeComponent/CommentCreator';
import CommentRenderer from '../../components/units/homeComponent/CommentRenderer';
import { useSelector } from 'react-redux';

function Home() {

  // const isLoggedin = useSelector(state => state.authSlice.isLoggedin)
  const { fanLetters } = useSelector(state => state.fanLetterSlice);
  const [selectedBtn, setSelectedBtn] = useState('카리나');
  const members = ['카리나', '지젤', '윈터', '닝닝']
  const filteredData = fanLetters.filter(item => item.selectedPage === selectedBtn)

  const filteredFanLetter = (selectedPage) => {
    setSelectedBtn(selectedPage)
  }

  //로그인 체크용
  const isLoggedin = true

  return (
    <>
      <StHeader >
        <StName>
          <div>팬레터 제작하기</div>
          <div>React_4기 박강토</div>
        </StName>
        {isLoggedin ? (
          <>
            <button>마이페이지</button>
            <button>로그아웃</button>
          </>
        ) : (
          <>
            <button>로그인하기</button>
            <button>회원가입하기</button>
          </>
        )}
        <StMember>
          {members.map(member => (
            <Button
              key={member}
              isActive={selectedBtn === member}
              onClick={() => filteredFanLetter(member)}
            >
              {member}
            </Button>
          ))}
        </StMember>
      </StHeader>
      <StBox className='createBox'>
        <CommentCreator />
      </StBox>
      <StMain className='loadBox'>
        <StUl>
          <CommentRenderer
            filteredData={filteredData}
          />
        </StUl>
      </StMain >
    </>
  )
}

const StHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 1100px;
  height: 150px;
  background-color: #f5eee6;
  margin-bottom: 15px;
  gap: 15px;
  `

const StName = styled.h1`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin-top: 20px;
  background-color: #f5eee6;
`
const StMember = styled.h1`
  display: flex;
  justify-content: space-between;
  width: 330px;
  height: 30px;
  gap: 15px;
  padding-bottom: 15px;
`
const StMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1100px;
  height: auto;
  color: black;
`
const StBox = styled.form`
  display: flex;
  width: 1100px;
  justify-content: center;
  margin-bottom: 2rem;
`
const StUl = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: #f3e1edad;
  border-radius: 15px;
`



export default Home