from langchain_anthropic import ChatAnthropic


sonnet_scope_llm = ChatAnthropic(
    model="claude-3-5-sonnet-20241022",
    temperature=0.1,
    max_tokens=4000,
    max_retries=0,
    timeout=60
)


haiku_flow_llm = ChatAnthropic(
    model="claude-3-5-haiku-20241022",
    temperature=0.0,
    max_tokens=1500,
    max_retries=0,
)


haiku_email_llm = ChatAnthropic(
    model="claude-3-5-haiku-20241022",
    temperature=0.3,
    max_tokens=1000,
    max_retries=0
)