import defaultImg from '../../../assets/img.png'
import Button from '../../commons/buttons/Button';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __addLetter } from '../../../redux/modules/fanLetterSlice';

function CommentCreator() {

  const dispatch = useDispatch();
  const { avatar, nickname, userId } = useSelector(state => state.authSlice)
  const [content, setContent] = useState('');
  const [selectedPage, setSelectedPage] = useState('카리나');

  const addContent = (e) => {
    setContent(e.target.value)
  }

  const addButtonHandler = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('팬레터 내용을 입력해주세요!');
      return;
    }

    const addComment = {
      id: Date.now().toString(),
      profile: avatar || defaultImg,
      nickname,
      content,
      time: new Date().toISOString(),
      selectedPage: selectedPage,
      userId,
    };

    dispatch(__addLetter(addComment));
    setContent('')
    window.alert('팬레터를 발송했습니다!')
  }

  return (
    <>
      <StBox className='inputData'>
        <StSection>
          <StLabel>닉네임:</StLabel>
          <span>{nickname}</span>
        </StSection>
        <StSectionComment>
          <StLabel>팬레터:</StLabel>
          <textarea type="text"
            className='inputContent'
            maxLength={'120'}
            placeholder='팬레터는 최대120자까지 작성이 가능해요.'
            value={content}
            onChange={addContent}
          />
        </StSectionComment>
        <StSection>
          <StLabel>누구에게 보내실 건가요? </StLabel>
          <StSelectArea>
            <StSelector
              value={selectedPage}
              onChange={(e) =>
                setSelectedPage(e.target.value)}>
              <option value="카리나">카리나</option>
              <option value="지젤">지젤</option>
              <option value="윈터">윈터</option>
              <option value="닝닝">닝닝</option>
            </StSelector>
            <Button onClick={(e) => {
              addButtonHandler(e);
            }}
            >발송하기</Button>
          </StSelectArea>
        </StSection>
      </StBox>
    </>
  )
}

export default CommentCreator

const StSection = styled.section`
  display: flex;
  align-items: center;
  width: 500px;
  height: 30px;
  
  input{
    font-family: inherit;
    text-align: center;
    border: transparent;
    border-radius: 5px;
    width: 300px;
    height: 25px;

  }
  
`

const StSelector = styled.select`
  text-align: center;
  border: 1px solid #C4C4C4;
  border-radius: 10px;
  width: 90px;
  color: black;
`

const StSectionComment = styled.section`
  display: flex;
  align-items: center;
  width: 500px;
  height: 230px;

  textarea{
    font-family: inherit;
    border: transparent;
    width: 400px;
    height: 200px;
    font-size: 1.3rem;
    }
`
const StLabel = styled.label`
  font-size: 1.2rem;
  padding-right: 20px;
`

const StBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  border-radius: 15px;
  background-color: #f3e1ed;
  padding: 15px;
`

const StSelectArea = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 240px;
  gap: 15px;
`