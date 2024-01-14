import Modal from "@/components/elements/Modal/Modal";

export default function Modals() {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Modal title</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere erat a ante venenatis dapibus posuere velit aliquet.
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
            <Modal/>
        </div>
        )
}