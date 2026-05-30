import streamlit as st
from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

st.title("LinkedIn Ghost Recruiter AI")

profile = st.text_area("Your CV / LinkedIn profile")
job = st.text_area("Job offer")

if st.button("Analyze"):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a recruiter AI."},
            {"role": "user", "content": f"""
Compare profile and job.

Return:
- score 0-100
- summary
- missing skills
- advice

PROFILE:
{profile}

JOB:
{job}
"""},
        ],
    )

    st.write(response.choices[0].message.content)