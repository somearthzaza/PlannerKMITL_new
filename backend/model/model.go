package model

type Curriculum struct{
	Curriculum_id int `json:"curriculum_id"  `
	Curriculum_name string `json:"curriculum_name"`
	Type_id any `json:"type_id"`
	Total_credit int `json:"total_credit"`
}

type Subject struct {
	Subject_id string `json:"subject_id"`
	Subject_name string `json:"subject_name"`
	Credit int `json:"credit"`
	Type string `json:"type"`
	Curriculum_id int `json:"curriculum_id"`
	Curriculum_name string `json:"Curriculum_name"`

}

type AllType struct {
	Type_id int `json:"type_id"`
	Abbreviation string `json:"abbreviation"`
	StandFor string `json:"stand for" bson:"stand for"`
}