import { BsFileEarmarkPlus } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";

const CreateButton = () => {
  return (
    <div className="create-list">
      <div className="createButton">
        <div className="buttons-list">
          <button>
            <BsFileEarmarkPlus />
            <span class="button-text">Create Hotel</span>
          </button>
          <button>
            <BsFileEarmarkPlus />
            <span class="button-text">Create Hotel</span>
          </button>
          <button>
            <BsFileEarmarkPlus />
            <span class="button-text">Create Hotel</span>
          </button>
          <button>
            <BsFileEarmarkPlus />
            <span class="button-text">Create Hotel</span>
          </button>
          <button>
            <BsFileEarmarkPlus />
            <span class="button-text">Create Hotel</span>
          </button>
          <button>
            <BsFileEarmarkPlus />
            <span class="button-text">Create Hotel</span>
          </button>
        </div>
        <button>
          <BiMessageSquareAdd />
        </button>
      </div>
    </div>
  );
};

export default CreateButton;
