import { Link } from "react-router-dom";
import { CgCalendarDates } from "react-icons/cg";
import { FaUserGraduate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { AiFillFolderOpen } from "react-icons/ai";
import { BsFileText } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";

const OffcanvasComponent = () => {

    return ( 
        <div className="offcanvas offcanvas-end bg-altdark" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header d-flex justify-content-between align-items-center">
                <h5 id="offcanvasRightLabel" className="text-altorange mb-0">Admin Meni</h5>
                <button type="button" className="btn-close text-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body p-0 mt-2">
                <div className="list-group-flush w-100 rounded-0">
                    <Link to={`/admin/students`} data-bs-dismiss="offcanvas" className="d-flex align-items-center list-group-item list-group-item-action bg-altdark border-0 p-3 fs-5 border-bottom border-top border-altorange text-altorange">
                        <FaUserGraduate size="23px" className="text-secondary me-3" />
                        Studenti
                    </Link>
                    <Link to={`/admin/courses`} data-bs-dismiss="offcanvas" className="d-flex align-items-center list-group-item list-group-item-action bg-altdark border-0 p-3 fs-5 border-bottom border-altorange text-altorange">
                        <FaGraduationCap size="23px" className="text-secondary me-3" />
                        Kursevi
                    </Link>
                    <Link to={`/admin/teachers`} data-bs-dismiss="offcanvas" className="d-flex align-items-center list-group-item list-group-item-action bg-altdark border-0 p-3 fs-5 border-bottom border-altorange text-altorange">
                        <GiTeacher size="23px" className="text-secondary me-3" />
                        Nastavnici
                    </Link>
                    <Link to={`/admin/exam-periods`} data-bs-dismiss="offcanvas" className="d-flex align-items-center list-group-item list-group-item-action bg-altdark border-0 p-3 fs-5 border-bottom border-altorange text-altorange">
                        <CgCalendarDates size="23px" className="text-secondary me-3" />
                        Ispitni Rokovi
                    </Link>
                    <Link to={`/admin/documents`} data-bs-dismiss="offcanvas" className="d-flex align-items-center list-group-item list-group-item-action bg-altdark border-0 p-3 fs-5 border-bottom border-altorange text-altorange">
                        <AiFillFolderOpen size="23px" className="text-secondary me-3" />
                        Dokumenti
                    </Link>
                    <Link to={`/admin/payments`} data-bs-dismiss="offcanvas" className="d-flex align-items-center list-group-item list-group-item-action bg-altdark border-0 p-3 fs-5 border-bottom border-altorange text-altorange">
                        <MdAttachMoney size="23px" className="text-secondary me-3" />
                        Uplate
                    </Link>
                    <Link to={`/admin/exams`} data-bs-dismiss="offcanvas" className="d-flex align-items-center list-group-item list-group-item-action bg-altdark border-0 p-3 fs-5 border-bottom border-altorange text-altorange">
                        <BsFileText size="23px" className="text-secondary me-3" />
                        Ispiti
                    </Link>
                    <Link to={`/admin/new-admin`} data-bs-dismiss="offcanvas" className="d-flex align-items-center list-group-item list-group-item-action bg-altdark border-0 p-3 fs-5 border-bottom border-altorange text-altorange">
                        <IoMdPersonAdd size="23px" className="text-secondary me-3" />
                        Kreiraj Admina
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default OffcanvasComponent;