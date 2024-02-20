
import styled from 'styled-components';
import Button from '../../commons/buttons/Button';
import { useDispatch } from 'react-redux';
import { setEditContents } from '../../../redux/modules/modalSlice';

function CommentModal({
  isModalOpen,
  closeModal,
  changedHandler,
  editContent,
}) {

  const dispatch = useDispatch()

  const editHandler = (e) => {
    dispatch(setEditContents(e.target.value));
  }

  const closeHandle = () => {
    dispatch(closeModal());
  }


  if (!isModalOpen) return null;

  return (
    <StModalBox className='modalOverlay'>
      <div className='modalContents'>
        <StTextarea
          type="text"
          value={editContent}
          onChange={editHandler}
          placeholder='팬레터 내용을 작성해주세요!'
        >
        </StTextarea>
        <StModalBtn>
          <Button onClick={changedHandler}>수정완료</Button>
          <Button onClick={closeHandle}>수정취소</Button>
        </StModalBtn>
      </div>
    </StModalBox>

  )
}

export default CommentModal

const StModalBox = styled.div`
  display: flex;
  width: 860px;
`

const StTextarea = styled.textarea`
  position: sticky;
  width: 855px;
  height: 290px;
  background-color: #e0cef3;
  border: 1px solid black;
  color: #1c1a1a;
  font-size: 1.3rem;
  line-height: 1.7;
`


const StModalBtn = styled.div`
  width: 200px;
  height: 30px;
  gap: 5px;
  padding-top: 5px;

`